#include <ESP8266WiFi.h>

#include "pins.h"
#include "wifi.h"
#include "http.h"
#include "html.h"

#include "secrets.h"

// left side of board (usb port pointing down)
#define S3 10
#define S2 9

// right side of board (usb port pointing down)
#define D1 5
#define D2 4
#define D4 2
#define D5 14
#define D6 12
#define D7 13
#define D5 15
#define RX 3
#define TX 1

WiFiServer server(80);

boolean Orient = 0;
int papel = 1;
int speed = 0;

void setup() {
  // Initialize serial
  Serial.begin(115200);
  pinMode(D4, OUTPUT);
  pinMode(D1, OUTPUT);
  pinMode(D2, OUTPUT);
  pinMode(D6, INPUT);

  // Connect to WiFi network
  connectToWiFi(WLAN_SSID, WLAN_PASS);
  printWifiStatus();

  // Start the server
  server.begin();
  Serial.println("\nServer started");
}

void loop() {
  // Wait until a client connects to our server
  WiFiClient client = server.available();
  if (!client) {
    return;
  }

  // Wait until the connected client sends the request data
  while (!client.available()) {
    delay(1);
  }

  // Get the first line of the HTTP request
  String request = client.readStringUntil('\r');

  // Ignore browser requests for favicon.ico
  if (request.indexOf("favicon.ico") >= 0) {
    return;
  }

  String part01 = getValue(request,'/',0);
  String part02 = getValue(request,'/',1);
  String part03 = getValue(request,'/',2);

  char charBuf[50];
  part02.toCharArray(charBuf, 20);

  Serial.println();
  Serial.println(request);
  Serial.println(part02);

 if (strcmp(charBuf,"motor HTTP")==0)
  {
       client.println("HTTP/1.1 204 No Content");
       client.println();
       Orient = 0;
       speed = 1000;
       setMotor(speed, Orient);
       Serial.print("Velocidade = ");
       Serial.println(speed);
       delay(1500);
       client.flush();
       speed = 0;
  }

 if (strcmp(charBuf,"motorev HTTP")==0)
  {
       client.println("HTTP/1.1 204 No Content");
       client.println();
       Orient = 1;
       speed = 1000;
       setMotor(speed, Orient);
       Serial.print("Velocidade = ");
       Serial.println(speed);
       delay(1500);
       client.flush();
       speed = 0;
  }
  
if (strcmp(charBuf,"sensor HTTP")==0)
  {
       papel = digitalRead(D6);
       client.println("HTTP/1.1 200 OK");
       client.println("Content-Type: application/json");
       client.println();
       client.print("{\"papel\":");client.print(papel);client.print("}");
       Serial.print("Papel = ");
       Serial.println(papel);
  }

   setMotor(speed, Orient);
   Serial.print("Velocidade = ");
   Serial.println(speed);
}

void setMotor(int speed, boolean Orient)
{
  analogWrite(D2, speed);
  digitalWrite(D1, !Orient);
  digitalWrite(D4, Orient);
}


String getValue(String data, char separator, int index)
{
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length()-1;

  for(int i=0; i<=maxIndex && found<=index; i++){
    if(data.charAt(i)==separator || i==maxIndex){
        found++;
        strIndex[0] = strIndex[1]+1;
        strIndex[1] = (i == maxIndex) ? i+1 : i;
    }
  }

  return found>index ? data.substring(strIndex[0], strIndex[1]) : "";
}
