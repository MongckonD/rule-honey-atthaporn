import { useEffect, useState } from "react";
import { RULES } from "./data/rules";
import RuleCard from "./components/RuleCard";
import FeeCard from "./components/FeeCard";
import CheckCard from "./components/CheckCard";
import BlackCard from "./components/BlackCard";
import KaengCard from "./components/KaengCard";
import FootballCard from "./components/FootballCard";
import OddsCard from "./components/OddsCard";
import AccountCard from "./components/AccountCard";
import QrBox from "./components/QrBox";

type Page = "home" | "fees" | "check" | "rules" | "black" | "kaeng" | "football" | "odds";

const LABEL: Record<Exclude<Page, "home">, string> = {
  fees: "QR code + ค่าธรรมเนียม",
  check: "เช็คไฟล์ NAM",
  rules: "กฎกลางเพิ่มเติม",
  black: "กฎดำ",
  kaeng: "กฎแคง",
  football: "กฎเดิมบอล",
  odds: "กฎอัตราต่อรอง",
};

const SUBTITLE: Partial<Record<Page, string>> = {
  fees: "ค่าธรรมเนียมและกฎการโอน",
  check: "กฎการเช็คไฟล์NAM",
  rules: "ข้อ 1-21 คือ กฎกลาง Nam autthaporn เสียงของกลางถือเป็นที่สิ้นสุด",
};

const PAGE_IDS = Object.keys(LABEL) as Page[];

const fromHash = (): Page => {
  const h = location.hash.replace("#", "");
  return PAGE_IDS.includes(h as Page) ? (h as Page) : "home";
};

function Tile({ id, tone, children }: {
  id: Exclude<Page, "home">;
  tone: "pink" | "blue";
  children?: React.ReactNode;
}) {
  return (
    <a className={`tile tile-${tone} tile-${id}`} href={`#${id}`}>
      {children}
      <span className="tile-label">{LABEL[id]}</span>
      <span className="tile-more" aria-hidden>ดูกฎ →</span>
    </a>
  );
}

function Home() {
  return (
    <>
      <AccountCard />
      <div className="tile-grid">
        <Tile id="fees" tone="pink">
          <QrBox small />
        </Tile>
        <Tile id="black" tone="blue" />
        <Tile id="kaeng" tone="pink" />
        <Tile id="rules" tone="blue" />
        <Tile id="football" tone="blue" />
        <Tile id="check" tone="pink" />
        <Tile id="odds" tone="pink" />
      </div>
    </>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>(fromHash);

  useEffect(() => {
    const onHash = () => {
      setPage(fromHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const tone = ["check", "black", "football"].includes(page) ? "tone-blue" : "";

  return (
    <div className="app">
      <header className="hero">
        <div className="script">Namphueng</div>
        <h1 className="tagline">
          <span className="tagline-lead">รับกลางเดิมพัน</span>
          <span className="tagline-list">ฟีฟาย-แคง-บอล-เปส-มวย-ถือเงิน</span>
        </h1>
        {SUBTITLE[page] && <p className="sub">{SUBTITLE[page]}</p>}
      </header>

      <main className={tone}>
        {page === "home" ? (
          <Home />
        ) : (
          <>
            <a className="back-link" href="#">← กลับหน้าหลัก</a>
            <h2 className="page-title">{LABEL[page]}</h2>

            {page === "fees" && (
              <>
                <section className="card qr-card">
                  <QrBox />
                </section>
                <FeeCard />
              </>
            )}
            {page === "check" && <CheckCard />}
            {page === "black" && <BlackCard />}
            {page === "kaeng" && <KaengCard />}
            {page === "football" && <FootballCard />}
            {page === "odds" && <OddsCard />}
            {page === "rules" &&
              RULES.map((rule) => <RuleCard key={rule.no} rule={rule} />)}

            <a className="next-page" href="#">← กลับหน้าหลัก</a>
          </>
        )}

        <footer>🎀 เสียงของกลางถือเป็นที่สิ้นสุด 🎀</footer>
      </main>
    </div>
  );
}
