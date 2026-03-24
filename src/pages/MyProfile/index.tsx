import { useState } from "react";
import ProFile from "@/components/common/ProFile";
import { updateMyProfile, uploadProfileImage } from "@/apis/Profile";
import { useAuthStore } from "@/store/useAuthStore";
import styles from "./index.module.css";

type TabId = "reviews" | "wines";

const TABS: { id: TabId; label: string; count: number }[] = [
  { id: "reviews", label: "내가 쓴 후기", count: 8 },
  { id: "wines", label: "내가 등록한 와인", count: 4 },
];

export default function MyProfile() {
  const user = useAuthStore((state) => state.user);
  const setLogin = useAuthStore((state) => state.setLogin);
  const [image, setImage] = useState(user?.image ?? "");
  const [nickname, setNickname] = useState(user?.nickname ?? "");
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("reviews");

  const handleImageChange = (imageUrl: string, file?: File) => {
    setImage(imageUrl);
    setPendingImageFile(file ?? null);
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      let nextImage = image;

      if (pendingImageFile) {
        nextImage = await uploadProfileImage(pendingImageFile);
      }

      const updatedUser = await updateMyProfile({
        nickname,
        image: nextImage || null,
      });

      setImage(updatedUser.image ?? "");
      setNickname(updatedUser.nickname);
      setLogin(updatedUser);

      setPendingImageFile(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileRow}>
        <ProFile
          imageUrl={image}
          nickname={nickname}
          onImageChange={handleImageChange}
          onNicknameChange={handleNicknameChange}
          onSave={handleSave}
          isLoading={isLoading}
        />

        <div className={styles.tabSection}>
          <div role="tablist" className={styles.tabList}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                <span className={styles.tabCount}>{tab.count}</span>
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`tabpanel-${activeTab}`}
            className={styles.tabPanel}
          >
            {activeTab === "reviews" && (
              <p>내가 쓴 후기 목록</p>
            )}
            {activeTab === "wines" && (
              <p>내가 등록한 와인 목록</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}