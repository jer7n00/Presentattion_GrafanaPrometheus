import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get('http://localhost:3001/message');
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching message:', error);
        //ijijo
      }
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>React Monitoring App</h1>
      <p>Message from API: {message}</p>
    </div>
  );
};

export default App;
