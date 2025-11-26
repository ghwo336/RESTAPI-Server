import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.join(__dirname, '.env')});

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('데이터 베이스 연결에 성공하였습니다.');
  } catch (err) {
    console.error('데이터 베이스 연결에 실패하였습니다.', err);
    process.exit(1);
  }
}
