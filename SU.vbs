Set oShell = CreateObject ("Wscript.Shell") 
Dim strArgs
strArgs = "cmd /c RUN.bat"
oShell.Run strArgs, 0, false