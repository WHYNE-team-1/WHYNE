import { useState } from "react";
import SearchBar from "@/components/common/SearchBar";

export default function SearchBarSample() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div
      style={{
        maxWidth: "600px",
        padding: "40px 40px",
      }}
    >
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px" }}
      >
        SearchBar 테스트 페이지
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        <div>
          <SearchBar
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <p style={{ marginTop: "10px", fontSize: "14px" }}>
            입력값: {searchValue}
          </p>
        </div>
      </div>
    </div>
  );
}
