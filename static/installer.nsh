!macro customInstall
  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "Boo" "Software\Clients\StartMenuInternet\Boo\Capabilities"

  WriteRegStr SHCTX "SOFTWARE\Classes\Boo" "" "Boo HTML Document"
  WriteRegStr SHCTX "SOFTWARE\Classes\Boo\Application" "AppUserModelId" "Boo"
  WriteRegStr SHCTX "SOFTWARE\Classes\Boo\Application" "ApplicationIcon" "$INSTDIR\Boo.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Boo\Application" "ApplicationName" "Boo"
  WriteRegStr SHCTX "SOFTWARE\Classes\Boo\Application" "ApplicationCompany" "Boo"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Boo\Application" "ApplicationDescription" "Extensible, fast and innovative web browser with Innatical UI."      
  WriteRegStr SHCTX "SOFTWARE\Classes\Boo\DefaultIcon" "DefaultIcon" "$INSTDIR\Boo.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Boo\shell\open\command" "" '"$INSTDIR\Boo.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "Boo" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "Boo" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Boo" "" "Boo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Boo\DefaultIcon" "" "$INSTDIR\Boo.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Boo\Capabilities" "ApplicationDescription" "Extensible, fast and innovative web browser with Innatical UI."
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Boo\Capabilities" "ApplicationName" "Boo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Boo\Capabilities" "ApplicationIcon" "$INSTDIR\Boo.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Boo\Capabilities\FileAssociations" ".htm" "Boo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Boo\Capabilities\FileAssociations" ".html" "Boo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Boo\Capabilities\URLAssociations" "http" "Boo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Boo\Capabilities\URLAssociations" "https" "Boo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Boo\Capabilities\StartMenu" "StartMenuInternet" "Boo"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\Boo\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Boo\shell\open\command" "" "$INSTDIR\Boo.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\Boo"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\Boo"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "Boo"
!macroend