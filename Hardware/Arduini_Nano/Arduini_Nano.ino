/*
  AnalogReadSerial
  Reads an analog input on pin 0, prints the result to the serial monitor.
  Graphical representation is available using serial plotter (Tools > Serial Plotter menu)
  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.

  This example code is in the public domain.
*/
int papel = 0;
// the setup routine runs once when you press reset:
void setup() {
  Serial.begin(9600);
  pinMode(8, OUTPUT);
  pinMode(13, OUTPUT);
}

// the loop routine runs over and over again forever:
void loop() {
  // read the input on analog pin 0:
  int papelanalog = analogRead(A0);
  // print out the value you read:
  Serial.print("Sensor = ");
  Serial.println(papelanalog);
  Serial.print("Papel = ");
  Serial.println(papel);
  if (papelanalog >= 1000) {
    papel=1;
    digitalWrite(8, HIGH);
    digitalWrite(13, HIGH);
  } else {
    papel=0;
    digitalWrite(8, LOW);
    digitalWrite(13, LOW);
  }
  delay(100);        // delay in between reads for stability
}
