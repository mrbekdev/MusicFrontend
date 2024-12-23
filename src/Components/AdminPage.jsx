import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [songs, setSongs] = useState([]); // Qo'shiqlarni saqlash uchun

  // Qo'shiqlarni olish uchun fetchSongs funksiyasini yaratish
  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setSongs(response.data); // Qo'shiqlarni state'ga saqlash
    } catch (err) {
      console.error('Qo\'shiqni olishda xatolik:', err);
    }
  };

  // Qo'shiq qo'shishdan so'ng qo'shiqlarni yangilash
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !image || !file) {
      setError("Barcha maydonlarni to'ldiring.");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess('Qo\'shiq muvaffaqiyatli qo\'shildi!');
      fetchSongs(); // Qo'shiq qo'shilgandan so'ng qo'shiqlarni yangilash
    } catch (error) {
      setError('Xatolik yuz berdi: ' + (error.response?.data?.message || error.message));
    }
  };

  // Componentni birinchi marta yuklaganda qo'shiqlarni olish
  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <h1>Qo'shiq qo'shish</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Qo'shiq nomi"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Surat yuklash:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br />
        <label>Qo'shiq fayli yuklash:</label>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button type="submit">Qo'shish</button>
      </form>
    </div>
  );
};

export default AdminPage;
