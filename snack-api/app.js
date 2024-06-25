// Import modul yang diperlukan
import { querySQL } from "./utils.js";
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Inisialisasi aplikasi Express
const app = express();
const port = 3500;

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  // konfigurasi penamaan file yang unik
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: diskStorage });
// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

// // Middleware untuk parsing JSON dan URL-encoded data
// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

app.get("/resep/:id",  async (req, res) => {
  try {
    const result = await querySQL("SELECT * FROM resep WHERE RecipeID = ?", [req.params.id]);
    res.json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data resep" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const result = await querySQL("SELECT * FROM users WHERE id=?", [req.params.id]);
    res.json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data pengguna" });
  }
});

// Endpoint untuk menampilkan semua resep (contoh)
app.get("/resep",  async (req, res) => {
  try {
    const result = await querySQL("SELECT * FROM resep");
    console.log(result);
    res.json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data resep" });
  }
});

// Endpoint untuk menambah resep baru
app.post("/resep", upload.single("photos"), async (req, res) => {
  const { RecipeID, JudulResep, Deskripsi, WaktuMemasak, Kesulitan, Kategori, Bahan, CaraMemasak, RatingRataRata, UserID } = req.body;
  const gambar = req.file.filename
  // if (!RecipeID || !JudulResep || !Deskripsi || !WaktuMemasak || !Kesulitan || !Kategori || !Bahan || !CaraMemasak || !RatingRataRata || !UserID || !gambar) {
  //   return res.status(400).json({ error: "Semua field wajib diisi" });
  // }
  try {
    const insertQuery = `
      INSERT INTO resep (RecipeID, JudulResep, Deskripsi, WaktuMemasak, Kesulitan, Kategori, Bahan, CaraMemasak, RatingRataRata, UserID, gambar)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await querySQL(insertQuery, [RecipeID, JudulResep, Deskripsi, WaktuMemasak, Kesulitan, Kategori, Bahan, CaraMemasak, RatingRataRata, UserID, gambar]);
    console.log(result.insertId);
    res.status(201).json({ message: "Resep berhasil ditambahkan", id: result.insertId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan dalam menambahkan resep" });
  }
});



// Endpoint untuk registrasi pengguna
app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  console.log(req.body);
  try {
    // Validasi apakah email atau username sudah ada di database
    const existingUser = await querySQL("SELECT * FROM users WHERE email = ? OR username = ?", [email, username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Email atau username sudah digunakan" });
    }
    // Jika tidak ada, tambahkan pengguna baru ke dalam database
    const insertQuery = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
    const result = await querySQL(insertQuery, [email, username, password]);
    console.log(result.insertId);
    // Kirim respons berhasil
    res.status(201).json({ message: "Registrasi berhasil", id: result.insertId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan dalam registrasi" });
  }
});

// Endpoint untuk menampilkan semua pengguna (contoh)
app.get("/users", async (req, res) => {
  try {
    const result = await querySQL("SELECT * FROM users");
    console.log(result);
    res.json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data pengguna" });
  }
});

// Penanganan untuk metode GET pada endpoint /register
app.get("/register", (req, res) => {
  res.status(405).send("Method Not Allowed");
});

app.get("/files/:file_name", (req, res) => {
  const filePath = path.join("uploads", req.params.file_name);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath, { root: "." });
  } else {
    res.status(404).send({ msg: "File not found!" });
  }
});

// Mendengarkan port yang ditentukan
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
