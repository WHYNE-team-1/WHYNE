import Dropdown from "@/components/common/Dropdown";
import type { DropdownOption } from "@/components/common/Dropdown";
import IcDefaultProfile from "@/assets/icons/ic-default-profile.svg";
import IcHamburger from "@/assets/icons/ic-hamburger.svg";

export default function DropdownSample() {
  const profileOptions: DropdownOption[] = [
    {
      label: "마이페이지",
      onClick: () => alert("마이페이지로 이동합니다!"),
    },
    {
      label: "로그아웃",
      onClick: () => alert("로그아웃 되었습니다!"),
    },
  ];

  const editOptions: DropdownOption[] = [
    {
      label: "수정하기",
      onClick: () => alert("수정되었습니다."),
    },
    {
      label: "삭제하기",
      onClick: () => alert("삭제되었습니다."),
    },
  ];

  return (
    <div
      style={{
        padding: "50px",
        minHeight: "100vh",
        paddingLeft: "150px",
      }}
    >
      <h1>드롭다운 컴포넌트 테스트 페이지</h1>
      <hr style={{ margin: "20px 0", marginBottom: "40px" }} />

      <div style={{ display: "flex", gap: "50px", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ fontSize: "16px", marginBottom: "20px", color: "#555" }}>
            1. 프로필 사진
          </h3>
          <Dropdown
            trigger={
              <img
                src={IcDefaultProfile}
                alt="프로필 메뉴 열기"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            }
            options={profileOptions}
            offset={18}
          />
        </div>

        <div style={{ paddingLeft: "40px", borderLeft: "1px solid #ddd" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "20px", color: "#555" }}>
            2. 더보기 아이콘
          </h3>
          <Dropdown
            trigger={
              <img
                src={IcHamburger}
                alt="더보기 메뉴 열기"
                style={{
                  width: "24px",
                  height: "24px",
                  display: "block",
                }}
              />
            }
            options={editOptions}
            offset={26}
          />
        </div>
      </div>
    </div>
  );
}
