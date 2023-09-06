import http from 'k6/http';
import { check, sleep } from 'k6';

// export const options = {
//   vus: 1045,
//   duration: '30s',
//   discardResponseBodies: true,
// };

export const options = {
  stages: [
    { duration: '1s', target: 1045 },
    { duration: '30s', target: 1045 },
  ],
};

export default function () {
  const max = 1000011;
  const min = 900000;
  const productId = Math.floor(Math.random() * (max - min) + min);
  const url = `http://localhost:3000/reviews?id=${productId}`;
  let res = http.get(url);
  check(res, {
    'status was 200': (r) => r.status === 200,
    // 'reviews contain photos': (r) => r.body.includes('photos'),
  });
  sleep(1);
}

// export default function () {
//   const max = 1000011;
//   const min = 900000;
//   const productId = Math.floor(Math.random() * (max - min) + min);
//   const url = `http://localhost:3000/reviews/search/natus?id=${productId}`;
//   let res = http.get(url);
//   check(res, {
//     'status was 200': (r) => r.status === 200,
//     // 'reviews contain photos': (r) => r.body.includes('photos'),
//   });
//   sleep(1);
// }

// export default function () {
//   const data = {
//     productId: 5,
//     rating: 5,
//     summary: "I liked the product",
//     body: "I REALLY REALLY REALLY liked the product",
//     recommend: true,
//     name: "John Doe",
//     email: "firstname@lastname.com",
//     photos: ["https://images.unsplash.com/photo-1487349384428-12b47aca925e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"],
//     characteristics: [5, 5, 5, 5],
//   };
//   const url = `http://localhost:3000/reviews`;
//   let res = http.post(url, JSON.stringify(data), {
//     headers: { 'Content-Type': 'application/json' },
//   });
//   check(res, {
//     'status was 201': (r) => r.status === 201,
//   });
//   sleep(1);
// }
