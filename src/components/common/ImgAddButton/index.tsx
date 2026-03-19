import { useRef, useState } from "react";
import styles from "./index.module.css";
import cn from "classnames";
import cameraIcon from "@/assets/icons/ic-camera.svg";
import deleteIcon from "@/assets/icons/ic-delete.svg";

export default function ImgAddButton({ error = false }) {
  // 파일 인 풋의 DOM 제어를 위한 ref
  //   error = true;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const imgFile = e.target.files?.[0];

    if (!imgFile) return;

    const imgFileURL = URL.createObjectURL(imgFile);

    setImgSrc(imgFileURL);
  }
  function handleDelete() {
    setImgSrc(null);
  }
  return (
    <div className={styles.wineAdd}>
      {error && <p className={styles.noti}>와인 사진은 필수입니다.</p>}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      {!imgSrc && (
        <button
          className={cn(styles.imgAddBtn, error && styles.error)}
          onClick={() => fileInputRef.current?.click()}
        >
          <img src={cameraIcon} width="24" height="24" />
        </button>
      )}
      {imgSrc && (
        <div className={styles.previewWrap}>
          <img className={styles.preview} src={imgSrc ?? undefined} />
          <button className={styles.imgDelBtn} onClick={handleDelete}>
            <img src={deleteIcon} width="24" height="24" />
          </button>
        </div>
      )}
    </div>
  );
}
