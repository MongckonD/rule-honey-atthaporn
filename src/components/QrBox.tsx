import { useState } from "react";
import { QR_SRC } from "../data/accounts";

const FILE_NAME = "namphueng-qr.png";

async function saveQr(src: string): Promise<"shared" | "downloaded" | "cancelled"> {
  // มือถือ: เปิดเมนูแชร์ของเครื่อง ซึ่งมี "บันทึกรูปภาพ" ลงคลังรูปได้เลย
  try {
    const blob = await (await fetch(src)).blob();
    const file = new File([blob], FILE_NAME, { type: blob.type || "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file] });
      return "shared";
    }
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") return "cancelled";
  }

  // คอม / เบราว์เซอร์ที่แชร์ไฟล์ไม่ได้: ดาวน์โหลดไฟล์ตรงๆ
  const a = document.createElement("a");
  a.href = src;
  a.download = FILE_NAME;
  document.body.appendChild(a);
  a.click();
  a.remove();
  return "downloaded";
}

export default function QrBox({ small = false }: { small?: boolean }) {
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");

  if (!QR_SRC) {
    return (
      <div className={`qr-box${small ? " small" : ""}`}>
        <span className="qr-placeholder">QR code</span>
      </div>
    );
  }

  const src = QR_SRC;
  const img = <img src={src} alt="QR code พร้อมเพย์ สำหรับโอนเงิน" />;

  // ในหน้าหลัก ทั้งช่องเป็นลิงก์อยู่แล้ว เลยไม่ซ้อนลิงก์
  if (small) return <div className="qr-box has-img small">{img}</div>;

  const onSave = async () => {
    setState("busy");
    const r = await saveQr(src);
    setState(r === "cancelled" ? "idle" : "done");
    if (r !== "cancelled") window.setTimeout(() => setState("idle"), 2000);
  };

  return (
    <div className="qr-full">
      <a className="qr-box has-img" href={QR_SRC} target="_blank" rel="noopener">
        {img}
      </a>
      <button
        type="button"
        className={`save-qr-btn${state === "done" ? " done" : ""}`}
        onClick={onSave}
        disabled={state === "busy"}
      >
        {state === "done" ? "บันทึกแล้ว ✓" : state === "busy" ? "กำลังบันทึก…" : "⬇ บันทึกรูป QR ลงเครื่อง"}
      </button>
      <p className="qr-hint">ถ้ากดแล้วไม่บันทึก ให้แตะที่รูป แล้วกดค้างเพื่อบันทึก</p>
    </div>
  );
}
