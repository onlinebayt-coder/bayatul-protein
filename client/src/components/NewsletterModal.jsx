import React, { useState } from "react";
import axios from "axios";
import { Bell, Tag, Calendar } from "lucide-react";

const options = [
  { label: "All Updates", value: "all", icon: <Bell className="inline mr-2 w-4 h-4" /> },
  { label: "Promotions Only", value: "promotions", icon: <Tag className="inline mr-2 w-4 h-4" /> },
  { label: "Events Only", value: "events", icon: <Calendar className="inline mr-2 w-4 h-4" /> },
];

const NewsletterModal = ({ email, onClose, onSuccess }) => {
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSelect = (value) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/newsletter/subscribe", {
        email,
        preferences: selected,
      });
      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Failed to subscribe. Please try again.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full animate-fadeInUp">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-16 h-16 rounded-full mb-4 flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #2377c1, #1a5a8f)'}}>
              <Bell className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-black">Thank you for subscribing!</h2>
            <p className="mb-6 text-gray-600 text-center">A confirmation email has been sent to your inbox.</p>
            <button 
              className="px-6 py-2.5 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              style={{background: 'linear-gradient(to right, #2377c1, #1a5a8f)'}}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full animate-fadeInUp">
        <h2 className="text-xl font-bold mb-4 text-black">Newsletter Preferences</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 space-y-3">
            {options.map((opt) => (
              <label 
                key={opt.value} 
                className="flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all"
                style={{
                  background: selected.includes(opt.value) 
                    ? 'linear-gradient(to right, #2377c1, #1a5a8f)' 
                    : '#f3f4f6',
                  color: selected.includes(opt.value) ? '#ffffff' : '#374151',
                  border: selected.includes(opt.value) ? 'none' : '2px solid #e5e7eb',
                  fontWeight: '500',
                  boxShadow: selected.includes(opt.value) ? '0 2px 8px rgba(35, 119, 193, 0.3)' : 'none'
                }}
              >
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={selected.includes(opt.value)}
                  onChange={() => handleSelect(opt.value)}
                  className="hidden"
                />
                {opt.icon}
                {opt.label}
              </label>
            ))}
          </div>
          {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
          <div className="flex justify-end gap-3 mt-5">
            <button 
              type="button" 
              className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-gray-100"
              style={{color: '#6b7280', border: '1.5px solid #e5e7eb'}}
              onClick={onClose} 
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2.5 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{background: (loading || selected.length === 0) ? '#cbd5e0' : 'linear-gradient(to right, #2377c1, #1a5a8f)'}}
              disabled={loading || selected.length === 0}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterModal; 