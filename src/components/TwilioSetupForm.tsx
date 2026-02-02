import React, { useState, useEffect } from 'react';

const TwilioSetupForm: React.FC = () => {
  const [sid, setSid] = useState('');
  const [token, setToken] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/twilio-setup')
      .then(res => res.json())
      .then(data => {
        setSid(data.sid || '');
        setToken(data.token || '');
        setPhone(data.phone || '');
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/twilio-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sid, token, phone }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Twilio setup updated!');
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (err) {
      setMessage('Network error');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded w-full max-w-md mx-auto mb-6">
      <h2 className="mb-2 text-lg font-bold">Twilio Account Setup</h2>
      <input
        type="text"
        placeholder="Account SID"
        value={sid}
        onChange={e => setSid(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="text"
        placeholder="Auth Token"
        value={token}
        onChange={e => setToken(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="text"
        placeholder="Twilio Phone Number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
      {message && <div className="mt-2 text-green-600">{message}</div>}
    </form>
  );
};

export default TwilioSetupForm;
