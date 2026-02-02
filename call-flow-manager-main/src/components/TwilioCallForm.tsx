import React, { useState } from 'react';

const TwilioCallForm: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCall = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: phone }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Call initiated!');
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (err) {
      setMessage('Network error');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleCall} className="p-4 border rounded w-full max-w-md mx-auto">
      <h2 className="mb-2 text-lg font-bold">Initiate Call (Twilio)</h2>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Calling...' : 'Call Now'}
      </button>
      {message && <div className="mt-2 text-red-500">{message}</div>}
    </form>
  );
};

export default TwilioCallForm;
