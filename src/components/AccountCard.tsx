import { useState } from "react";
import { ACCOUNTS, ACCOUNT_NOTE } from "../data/accounts";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
}

export default function AccountCard() {
  const [copied, setCopied] = useState<number | null>(null);

  const onCopy = async (i: number, number: string) => {
    await copyText(number.replace(/[^0-9]/g, ""));
    setCopied(i);
    window.setTimeout(() => setCopied((c) => (c === i ? null : c)), 1600);
  };

  return (
    <section className="account-card" aria-label="บัญชีสำหรับโอน">
      <p className="account-note">⚠ {ACCOUNT_NOTE}</p>
      {ACCOUNTS.map((a, i) => (
        <div className="account-row" key={a.label}>
          <div className="account-info">
            <span className="account-label">{a.label}</span>
            <span className="account-number">
              {a.icon && <img className="account-icon" src={a.icon} alt="" />}
              {a.number}
            </span>
            <span className="account-detail">{a.detail}</span>
          </div>
          <button
            type="button"
            className={`copy-btn${copied === i ? " done" : ""}`}
            onClick={() => onCopy(i, a.number)}
            aria-label={`คัดลอก${a.label}`}
          >
            {copied === i ? "คัดลอกแล้ว ✓" : "คัดลอก"}
          </button>
        </div>
      ))}
    </section>
  );
}
