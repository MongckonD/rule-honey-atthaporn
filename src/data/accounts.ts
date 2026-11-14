// number = ตัวที่แสดง, ตอนคัดลอกจะตัดขีด/ช่องว่างออกให้อัตโนมัติ
export type Account = {
  label: string;
  detail: string;
  number: string;
  icon?: string;
};

export const ACCOUNTS: Account[] = [
  { label: "เลขบัญชีธนาคาร", detail: "ธนาคารกสิกรไทย (K+) · อัฐพร ช่วยคูณ", number: "233-2-90132-2", icon: "/kbank-icon.png" },
  { label: "เลขวอเลท", detail: "TrueMoney Wallet · อัฐพร ช่วยคูณ", number: "061-258-0471", icon: "/truemoney-icon.png" },
];

export const ACCOUNT_NOTE = "มีสองบัญชีเท่านั้น · โอนบัญชีอื่นไม่รับผิดชอบทั้งสิ้น";

// รูป QR อยู่ที่ public/qr.png
export const QR_SRC: string | null = "/qr.png";
