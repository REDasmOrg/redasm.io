(ql:quickload :hunchentoot)
(ql:quickload :cl-json)
(ql:quickload :dexador)
(ql:quickload :uiop)
(ql:quickload :local-time)

(require :sb-posix)

(defconstant +github-url+ "https://api.github.com/repos/REDasmOrg/REDasm/")

(defun get-json-filename (s)
  (let* ((parts (uiop:split-string s :separator "/"))
         (name (first (last parts))))
    (format nil "~a.json" name)))

(defun cache-file (filename content)
  (with-open-file (f filename :direction :output
                              :if-exists :supersede
                              :if-does-not-exist :create)
    (write-sequence content f)))

(defun download-from (category file)
  (multiple-value-bind (body status) (ignore-errors (dex:get (uiop::strcat +github-url+ category)))
    (when (and body (= status 200)) 
      (cache-file file body)
      body)))

(defun needs-download? (file)
  (if (probe-file file)
      (let* ((stat (sb-posix:stat file))
             (mtime (local-time:unix-to-timestamp (sb-posix:stat-mtime stat)))
             (yesterday (local-time:timestamp- (local-time:today) 1 :day)))
        (local-time:timestamp<= mtime yesterday))
      t))

(defun process-json (category)
  (let* ((file (get-json-filename category))
         (r (if (needs-download? file) 
                (download-from category file)
                (uiop:read-file-string file))))
    r))

(defun main () 
  (hunchentoot:define-easy-handler (artifacts :uri "/artifacts") ()
				   (setf (hunchentoot:content-type*) "application/json")
				   (process-json "artifacts"))

  (hunchentoot:define-easy-handler (releases :uri "/releases") ()
				   (setf (hunchentoot:content-type*) "application/json")
				   (process-json "releases"))

  (format t "Starting server on port 3001...~%")
  (hunchentoot:start (make-instance 'hunchentoot:easy-acceptor :port 3001))
  (sb-thread:join-thread (find-if
			   (lambda (th)
			     (search "hunchentoot" (sb-thread:thread-name th)))
			   (sb-thread:list-all-threads)))
  (format t "Stopping server on port 3001...~%"))

(main)
