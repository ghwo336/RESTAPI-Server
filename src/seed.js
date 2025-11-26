import {fileURLToPath} from 'url';
import path from 'path';
import fs from 'fs';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {Student} from './models/student.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.join(__dirname, '.env')});

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('시드값을 위한 데이터베이스에 연결되었습니다.');

    const htmlPath = path.join(__dirname, 'html', 'hongik_dbms_table.html');
    const gtml = fs.readFileSync(htmlPath, 'utf-8');
    const $ = cheerio.load(gtml);
    const students = [];
    let sidCounter = 1;

    $('h2').each((_, h2) => {
      const headingText = $(h2).text().trim();

      let degree;
      if (headingText.includes('PhD')) degree = 'PhD';
      else if (headingText.includes('Master')) degree = 'Master';
      else if (headingText.includes('Undergraduate')) degree = 'Undergraduate';
      else return;
      const $table = $(h2).next('table');
      if ($table.length === 0) return;
      $table
        .find('tr')
        .slice(1)
        .each((_, tr) => {
          const tds = $(tr).find('td');
          if (tds.length < 3) return;

          const name = $(tds[0]).text().trim();
          const email = $(tds[1]).text().trim();
          const yearStr = $(tds[2]).text().trim();
          const graduation = parseInt(yearStr, 10);

          if (!name || !email || Number.isNaN(graduation)) return;

          students.push({
            sid: sidCounter++,
            name,
            email,
            degree,
            graduation,
          });
        });
    });
    await Student.deleteMany({});
    await Student.insertMany(students);
    console.log(`${students.length}개의 데이터가 있습니다.`);
  } catch (err) {
    console.error('데이터베이스 연결에 실패하였습니다.', err);
    process.exit(1);
  }
}

seedDatabase();
