import { useState } from "react";
import ProFile from "@/components/common/ProFile";

const DEFAULT_NICKNAME = "\uc640\uc778\uace0\ub974\ub294 \uc911";
const IMAGE_CHANGED_LOG = "\uc774\ubbf8\uc9c0 \ubcc0\uacbd\ub428:";
const NICKNAME_CHANGED_LOG = "\ub2c9\ub124\uc784 \ubcc0\uacbd:";
const SAVED_LOG = "\uc800\uc7a5\ub428:";
const INTERACTIVE_TITLE = "\uc774\ubca4\ud2b8 \ud578\ub4e4\ub7ec \ud3ec\ud568 (\uc778\ud130\ub799\ud2f0\ube0c)";
const READ_ONLY_TITLE = "\uc77d\uae30 \uc804\uc6a9 (\ud578\ub4e4\ub7ec \uc5c6\uc74c)";
const STATUS_TITLE = "\ud604\uc7ac \uc0c1\ud0dc";
const STATUS_HELP =
  "\uac1c\ubc1c\uc790 \ucf58\uc194(F12)\uc5d0\uc11c \uc774\ubbf8\uc9c0/\ub2c9\ub124\uc784 \ubcc0\uacbd \ubc0f \uc800\uc7a5 \ub85c\uadf8\ub97c \ud655\uc778\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.";

export default function ProFileTestPage() {
  const [image, setImage] = useState("");
  const [nickname, setNickname] = useState(DEFAULT_NICKNAME);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (imageUrl: string, file?: File) => {
    setImage(imageUrl);
    console.log(IMAGE_CHANGED_LOG, { imageUrl, fileName: file?.name });
  };

  const handleNicknameChange = (newNickname: string) => {
    setNickname(newNickname);
    console.log(NICKNAME_CHANGED_LOG, newNickname);
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(SAVED_LOG, { nickname, image });
    setIsLoading(false);
  };

  return (
    <div>
      <section>
        <h2>{INTERACTIVE_TITLE}</h2>
        <ProFile
          imageUrl={image}
          nickname={nickname}
          onImageChange={handleImageChange}
          onNicknameChange={handleNicknameChange}
          onSave={handleSave}
          isLoading={isLoading}
        />
      </section>

      <section>
        <h2>{READ_ONLY_TITLE}</h2>
        <ProFile imageUrl="" nickname={DEFAULT_NICKNAME} />
      </section>

      <section>
        <h2>{STATUS_TITLE}</h2>
        <pre style={{ background: "#f5f5f5", padding: "10px", borderRadius: "4px" }}>
          {JSON.stringify({ nickname, hasImage: !!image, isLoading }, null, 2)}
        </pre>
        <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
          {STATUS_HELP}
        </p>
      </section>
    </div>
  );
}
