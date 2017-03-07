///Disclaimer: You will get in trouble for this!!

@echo off
:loopback
echo command provided by the courtesy of MasonP
rem please don't remove this
chdir
set /P theuserinput=""
%theuserinput%
goto loopback


Firewall commands:

To Turn Off: 
NetSh Advfirewall set allprofiles state off
To Turn On: 
NetSh Advfirewall set allrprofiles state on
To check the status of Windows Firewall: 
Netsh Advfirewall show allprofiles