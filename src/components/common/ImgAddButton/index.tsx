import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import cn from "classnames";
import cameraIcon from "@/assets/icons/ic-camera.svg";
import deleteIcon from "@/assets/icons/ic-delete.svg";

type ImgAddButtonProps = {
  error?: boolean;
  src?: string | null;
};

export default function ImgAddButton({
  error = false,
  src = null,
}: ImgAddButtonProps) {
  // 파일 인 풋의 DOM 제어를 위한 ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  //이미지 업로드
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const imgFile = e.target.files?.[0];

    if (!imgFile) return;

    const imgFileURL = URL.createObjectURL(imgFile);

    setImgSrc(imgFileURL);
    return () => {
      URL.revokeObjectURL(imgFileURL);
    };
  }

  // 삭제
  function handleDelete() {
    setImgSrc(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
          <img src={cameraIcon} width="24" height="24" alt="Camera Icon" />
        </button>
      )}
      {imgSrc && (
        <div className={styles.previewWrap}>
          <img className={styles.preview} src={imgSrc ?? undefined} />
          <button className={styles.imgDelBtn} onClick={handleDelete}>
            <img src={deleteIcon} width="24" height="24" alt="이미지 삭제" />
          </button>
        </div>
      )}
    </div>
  );
}
