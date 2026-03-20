import ImgAddButton from "@/components/common/ImgAddButton";

export default function ImageAddButton() {
  return (
    <div
      style={{ margin: 24, display: "flex", gap: 24, alignItems: "flex-end" }}
    >
      <ImgAddButton />
      <ImgAddButton error />
      <ImgAddButton src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTffxhzedoNtFe4C2NbDkgnfmgVNCIpw_7c5w&s" />
    </div>
  );
}
