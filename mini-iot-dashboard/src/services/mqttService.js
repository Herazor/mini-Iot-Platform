import Paho from 'paho-mqtt';

class MQTTService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.callbacks = {
      onSuccess: null,
      onFailure: null,
      onMessage: null
    };
  }

  static getInstance() {
    if (!MQTTService.instance) {
      MQTTService.instance = new MQTTService();
    }
    return MQTTService.instance;
  }

  connect(callbacks) {
    this.callbacks = { ...this.callbacks, ...callbacks };
    
    const brokerUrl = 'test.mosquitto.org';
    const port = 8080;
    const clientId = 'blynk_' + Math.random().toString(36).substr(2, 9);

    try {
      this.client = new Paho.Client(brokerUrl, port, clientId);
      
      this.client.onConnectionLost = this.onConnectionLost.bind(this);
      this.client.onMessageArrived = this.onMessageArrived.bind(this);
      
      this.client.connect({
        onSuccess: this.onConnect.bind(this),
        onFailure: this.onFailure.bind(this),
        keepAliveInterval: 30,
        cleanSession: true
      });
      
    } catch (error) {
      console.error('MQTT connection error:', error);
      if (this.callbacks.onFailure) {
        this.callbacks.onFailure(error);
      }
    }
  }

  onConnect() {
    console.log('MQTT Connected');
    this.isConnected = true;
    
    // Subscribe to default topics
    this.subscribe('lora/EM300TH_001/data');
    this.subscribe('lora/EM300TH_001/status');
    
    if (this.callbacks.onSuccess) {
      this.callbacks.onSuccess();
    }
  }

  onFailure(error) {
    console.error('MQTT Connection failed:', error);
    this.isConnected = false;
    
    if (this.callbacks.onFailure) {
      this.callbacks.onFailure(error);
    }
    
    // Retry connection after 5 seconds
    setTimeout(() => {
      console.log('Retrying MQTT connection...');
      this.connect(this.callbacks);
    }, 5000);
  }

  onConnectionLost(responseObject) {
    console.log('MQTT Connection lost:', responseObject.errorMessage);
    this.isConnected = false;
    
    if (this.callbacks.onFailure) {
      this.callbacks.onFailure(responseObject);
    }
    
    // Auto-reconnect
    setTimeout(() => {
      console.log('Reconnecting to MQTT...');
      this.connect(this.callbacks);
    }, 3000);
  }

  onMessageArrived(message) {
    const topic = message.destinationName;
    const payload = message.payloadString;
    
    console.log('MQTT Message:', topic, payload);
    
    if (this.callbacks.onMessage) {
      this.callbacks.onMessage(topic, payload);
    }
  }

  subscribe(topic) {
    if (this.isConnected && this.client) {
      try {
        this.client.subscribe(topic);
        console.log('Subscribed to:', topic);
      } catch (error) {
        console.error('Subscribe error:', error);
      }
    }
  }

  publish(topic, message) {
    if (this.isConnected && this.client) {
      try {
        const mqttMessage = new Paho.Message(message);
        mqttMessage.destinationName = topic;
        this.client.send(mqttMessage);
        console.log('Published to:', topic, message);
      } catch (error) {
        console.error('Publish error:', error);
      }
    }
  }

  disconnect() {
    if (this.client && this.isConnected) {
      this.client.disconnect();
      this.isConnected = false;
      console.log('MQTT Disconnected');
    }
  }
}

export default MQTTService;