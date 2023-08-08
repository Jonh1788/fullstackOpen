sequenceDiagram
	participant browser
	participant server

	onClickInputButton browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
	activate server
	notes push new note	
browser->>server: GET 
https://studies.cs.helsinki.fi/exampleapp/notes
	 server-->>browser: HTML document
    deactivate server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
	activate server
	server-->>browser: the css file
	deactivate server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
 	activate server
	server-->>browser: the JavaScript file	deactivate server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
	activate server
	server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
	deactivate server
