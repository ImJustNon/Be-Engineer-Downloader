# Be Engineer Downloader 🎥

โปรแกรมสำหรับดาวน์โหลดและถอดรหัสวิดีโอจาก Be Online แปลงเป็นไฟล์ MP4 ที่สามารถเล่นได้ปกติ

## 🌟 คุณสมบัติ

- ✅ ดาวน์โหลดไฟล์ TS stream ที่ถูกเข้ารหัส
- ✅ ถอดรหัส AES-128-CBC อัตโนมัติ
- ✅ รวมไฟล์และแปลงเป็น MP4
- ✅ รองรับการดาวน์โหลดแบบต่อเนื่อง
- ✅ ตรวจสอบความสมบูรณ์ของไฟล์อัตโนมัติ

## 📋 ความต้องการของระบบ

- Node.js (เวอร์ชัน 16 หรือสูงกว่า)
- FFmpeg ติดตั้งในระบบ
- TypeScript runtime (tsx หรือ ts-node)

## 🚀 การติดตั้ง

### 1. Clone โปรเจกต์

```bash
git clone https://github.com/ImJustNon/Be-Engineer-Downloader.git
cd Be-Engineer-Downloader
```

### 2. ติดตั้งแพ็กเกจ

```bash
npm install
```

### 3. ติดตั้ง FFmpeg

#### macOS (ใช้ Homebrew):
```bash
brew install ffmpeg
```

#### Windows (ใช้ Chocolatey):
```bash
choco install ffmpeg
```

#### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install ffmpeg
```

## ⚙️ การตั้งค่า

### 1. เตรียม Encryption Key

สร้างไฟล์ `enckeybeonline.key` ในโฟลเดอร์หลัก:

```
Be-Engineer-Downloader/
├── enckeybeonline.key    <- ไฟล์ key ที่ต้องสร้าง
├── package.json
└── src/
```

**วิธีหา Encryption Key:**

1. เปิด Developer Tools (F12) ในเบราว์เซอร์
2. ไปที่แท็บ Network
3. เล่นวิดีโอที่ต้องการดาวน์โหลด
4. กรองด้วย `.key` หรือ `.m3u8`
5. ค้นหาไฟล์ที่มีชื่อคล้าย `encryption.key`
6. ดาวน์โหลดไฟล์นั้นมาเป็น `enckeybeonline.key`

### 2. แก้ไขการตั้งค่าใน `src/index.ts`

```typescript
const beeng = new BeEngDL({
    startSegment: 0,                    // เซกเมนต์เริ่มต้น (มักจะเป็น 0)
    url: "YOUR_VIDEO_URL_HERE",         // URL ของวิดีโอ
    identifier: "<<>>",                 // ตัวแทนหมายเลขเซกเมนต์
    encryptKey: ""                      // ไม่ต้องใส่ จะอ่านจากไฟล์ key อัตโนมัติ
});
```

## 🔍 วิธีหา URL และตั้งค่า

### ขั้นตอนการหา URL:

1. **เปิด Developer Tools (F12)**
2. **ไปที่แท็บ Network**
3. **กรองด้วย `.ts` หรือ `.m3u8`**
4. **เล่นวิดีโอที่ต้องการดาวน์โหลด**
5. **ค้นหาไฟล์ที่มีชื่อคล้าย `segment-0.ts`, `0.ts`, หรือรูปแบบคล้ายๆ กัน**

### ตัวอย่าง URL ที่พบ:
```
https://vdo.inclass.me/beonline/1.66%20module2%20Physics1/Physics1%20M2%20-%200.%20Introduction/Physics1%20M2%20-%200.%20Introduction0.ts
```

### การแปลง URL:
เปลี่ยนหมายเลขเซกเมนต์เป็น identifier:

**จาก:**
```
Physics1%20M2%20-%200.%20Introduction0.ts
```

**เป็น:**
```
Physics1%20M2%20-%200.%20Introduction<<>>.ts
```

### ตัวอย่างการตั้งค่า:

```typescript
const beeng = new BeEngDL({
    startSegment: 0,
    url: "https://vdo.inclass.me/beonline/1.66%20module2%20Physics1/Physics1%20M2%20-%200.%20Introduction/Physics1%20M2%20-%200.%20Introduction<<>>.ts",
    identifier: "<<>>",
    encryptKey: ""
});
```

## 📁 โครงสร้างโฟลเดอร์

```
Be-Engineer-Downloader/
├── 📄 enckeybeonline.key          # ไฟล์ encryption key
├── 📄 package.json
├── 📄 tsconfig.json
├── 📁 cache/                      # ไฟล์ชั่วคราว
│   ├── 📁 ffmpeg/                 # ไฟล์สำหรับ FFmpeg
│   └── 📁 stream/
│       ├── 📁 encrypted/          # ไฟล์ TS ที่เข้ารหัส
│       └── 📁 decrypted/          # ไฟล์ TS ที่ถอดรหัสแล้ว
├── 📁 output/                     # ไฟล์ MP4 ที่เสร็จแล้ว
└── 📁 src/
    ├── 📄 index.ts               # ไฟล์หลัก
    └── 📁 class/
        ├── 📄 BeEngDL.class.ts    # คลาสหลัก
        ├── 📄 Convert.class.ts    # การแปลงไฟล์
        ├── 📄 DecryptTS.class.ts  # การถอดรหัส
        └── 📄 DownloadTS.class.ts # การดาวน์โหลด
```

## 🎯 วิธีใช้งาน

### 1. เรียกใช้โปรแกรม

```bash
npm run dev
```

### 2. ขั้นตอนการทำงาน

โปรแกรมจะทำงานเป็น 3 ขั้นตอน:

1. **ดาวน์โหลดไฟล์ TS ที่เข้ารหัส**
   - ดาวน์โหลดเซกเมนต์ต่อเซกเมนต์จนครบ
   - เก็บไฟล์ใน `cache/stream/encrypted/`

2. **ถอดรหัสไฟล์**
   - ใช้ AES-128-CBC ถอดรหัส
   - ตรวจสอบความถูกต้องด้วย sync byte (0x47)
   - เก็บไฟล์ใน `cache/stream/decrypted/`

3. **รวมไฟล์และแปลงเป็น MP4**
   - รวมไฟล์ TS ทั้งหมดด้วย FFmpeg
   - แปลงเป็น MP4 และเก็บใน `output/`

### 3. ตัวอย่างผลลัพธ์

```
Step 1) Download TS Stream file with encryption
[ Info ] Deleted /cache/stream dir
[ Info ] Created /cache/stream dir
write file success : 0
write file success : 1
write file success : 2
...
[ Info ] Ended Download at segment : 150
Download completed. Total segments: 150

Step 2) Decrypt
[ Info ] Decrypted first byte: 0x47 (should be 0x47)
[ Info ] Decrypted : stream-segment-0.ts
[ Info ] Write file success : cache/decrypted/stream-segment-0.ts
...

Step 3) Concat and Convert to mp4
[ Info ] Creating file list for FFmpeg
[ Info ] Found 150 decrypted TS files
[ Info ] Converting to MP4
[ Info ] SUCCESS: Created output.mp4
[ Info ] File Size: 245.7 MB
```

## 🛠️ การตั้งค่าขั้นสูง

### การปรับแต่ง Identifier

โปรแกรมรองรับ identifier หลายแบบ:

```typescript
// สำหรับ URL ที่ใช้ <<>>
identifier: "<<>>"

// สำหรับ URL ที่ใช้ []
identifier: "[]"

// สำหรับ URL ที่ใช้ $$$
identifier: "$$$"

// หรือสตริงอื่นๆ ตามต้องการ
identifier: "SEGMENT_NUMBER"
```

### การเริ่มจากเซกเมนต์ที่กำหนด

```typescript
const beeng = new BeEngDL({
    startSegment: 50,  // เริ่มจากเซกเมนต์ที่ 50
    url: "...",
    identifier: "<<>>",
    encryptKey: ""
});
```

## 🔧 การแก้ไขปัญหา

### ปัญหาที่พบบ่อย:

#### 1. FFmpeg ไม่พบ
```
Error: ffmpeg not found
```
**วิธีแก้:** ติดตั้ง FFmpeg และตรวจสอบว่าอยู่ใน PATH

#### 2. ไฟล์ key ไม่พบ
```
Error: ENOENT: no such file or directory, open 'enckeybeonline.key'
```
**วิธีแก้:** ตรวจสอบว่าไฟล์ `enckeybeonline.key` อยู่ในโฟลเดอร์หลัก

#### 3. การถอดรหัสไม่สำเร็จ
```
[ Error ] Fail to decrypt : stream-segment-X.ts
```
**วิธีแก้:** ตรวจสอบว่า encryption key ถูกต้อง

#### 4. URL ไม่ถูกต้อง
```
404 Not Found
```
**วิธีแก้:** ตรวจสอบ URL และ identifier ให้ถูกต้อง

### การตรวจสอบ:

1. **ตรวจสอบ URL**
   ```bash
   curl -I "YOUR_URL_HERE"
   ```

2. **ตรวจสอบ FFmpeg**
   ```bash
   ffmpeg -version
   ```

3. **ตรวจสอบ Node.js**
   ```bash
   node --version
   ```

## 📚 API Reference

### BeEngDL Class

#### Constructor Options:
- `startSegment` (number): เซกเมนต์เริ่มต้น
- `url` (string): URL ของวิดีโอ
- `identifier` (string): ตัวแทนหมายเลขเซกเมนต์
- `encryptKey` (string): ไม่ใช้ (อ่านจากไฟล์)

#### Methods:
- `download()`: ดาวน์โหลดไฟล์ TS
- `decrypt()`: ถอดรหัสไฟล์
- `concatAndConvert()`: รวมไฟล์และแปลงเป็น MP4

## 🤝 การมีส่วนร่วม

ยินดีต้อนรับการมีส่วนร่วม! โปรดสร้าง Pull Request หรือ Issue

## 📄 License

MIT License - ใช้งานได้อย่างอิสระ

## 🙏 ขอบคุณ

- FFmpeg สำหรับการประมวลผลวิดีโอ
- Node.js community สำหรับแพ็กเกจต่างๆ

---

## ⚠️ ข้อควรระวัง

- โปรแกรมนี้สร้างขึ้นเพื่อการศึกษาเท่านั้น
- กรุณาใช้งานภายในกรอบกฎหมายลิขสิทธิ์
- ไม่แนะนำให้ใช้ดาวน์โหลดเนื้อหาที่มีลิขสิทธิ์โดยไม่ได้รับอนุญาต

## 📞 ติดต่อ

หากมีปัญหาหรือข้อสงสัย กรุณาสร้าง Issue ใน GitHub Repository