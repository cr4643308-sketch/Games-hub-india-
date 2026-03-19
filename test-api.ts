import axios from 'axios';
async function test() {
  try {
    const res = await axios.post('http://localhost:3000/api/apply', { content: 'test data' });
    console.log('Success:', res.status, res.data);
  } catch (e) {
    console.error('Error:', e.response?.status, e.response?.data || e.message);
  }
}
test();
