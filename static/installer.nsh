!macro customInstall
  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "Skye" "Software\Clients\StartMenuInternet\Skye\Capabilities"

  WriteRegStr SHCTX "SOFTWARE\Classes\Skye" "" "Skye HTML Document"
  WriteRegStr SHCTX "SOFTWARE\Classes\Skye\Application" "AppUserModelId" "Skye"
  WriteRegStr SHCTX "SOFTWARE\Classes\Skye\Application" "ApplicationIcon" "$INSTDIR\Skye.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Skye\Application" "ApplicationName" "Skye"
  WriteRegStr SHCTX "SOFTWARE\Classes\Skye\Application" "ApplicationCompany" "Skye"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Skye\Application" "ApplicationDescription" "Extensible, fast and innovative web browser with Innatical UI."      
  WriteRegStr SHCTX "SOFTWARE\Classes\Skye\DefaultIcon" "DefaultIcon" "$INSTDIR\Skye.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Skye\shell\open\command" "" '"$INSTDIR\Skye.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "Skye" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "Skye" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Skye" "" "Skye"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Skye\DefaultIcon" "" "$INSTDIR\Skye.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Skye\Capabilities" "ApplicationDescription" "Extensible, fast and innovative web browser with Innatical UI."
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Skye\Capabilities" "ApplicationName" "Skye"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Skye\Capabilities" "ApplicationIcon" "$INSTDIR\Skye.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Skye\Capabilities\FileAssociations" ".htm" "Skye"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Skye\Capabilities\FileAssociations" ".html" "Skye"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Skye\Capabilities\URLAssociations" "http" "Skye"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Skye\Capabilities\URLAssociations" "https" "Skye"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Skye\Capabilities\StartMenu" "StartMenuInternet" "Skye"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\Skye\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Skye\shell\open\command" "" "$INSTDIR\Skye.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\Skye"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\Skye"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "Skye"
!macroend