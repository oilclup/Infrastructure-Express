## เริ่มใช้งาน

\*\*\* ทุก Sub Folder ให้ Copy `.env.example` มาอีกอัน แล้วเปลี่ยนชื่อเป็น `.env` เพื่อให้ project สามารถใช้ environment variables ได้ จากนั้น cd ออกมาที่ root project และใช้คำสั่ง `npm install` แล้วใช้คำสั่งตามด้านล่างนี้ (setup ครั้งเดียว)

1. สั่ง `yarn prepare` เพื่อตั้งตั้งเครื่องมือและ Dependencies ทั้งหมด (setup ครั้งเดียว)
2. สั่ง `yarn dev` ให้ Service ทุกตัวทำงาน

## Services

-   API จะเข้าผ่าน `http://localhost:3000`
-   ADMIN จะเข้าผ่าน `http://localhost:8001`
