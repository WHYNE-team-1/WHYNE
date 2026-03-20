import styles from "./index.module.css";
import variantApple from "@/assets/images/img-variant-apple.png";
import variantCherry from "@/assets/images/img-variant-cherry.png";
import variantChocolate from "@/assets/images/img-variant-chocolate.png";
import variantCitrus from "@/assets/images/img-variant-citrus.png";
import variantCoconut from "@/assets/images/img-variant-coconut.png";
import variantFlower from "@/assets/images/img-variant-flower.png";
import variantGrass from "@/assets/images/img-variant-grass.png";
import variantHerb from "@/assets/images/img-variant-herb.png";
import variantMineral from "@/assets/images/img-variant-mineral.png";
import variantOakCask from "@/assets/images/img-variant-Oak Cask.png";
import variantPeach from "@/assets/images/img-variant-peach.png";
import variantGrape from "@/assets/images/img-variant-prape.png";
import variantToast from "@/assets/images/img-variant-toast.png";
import variantTropical from "@/assets/images/img-variant-tropical.png";
import variantWetSoil from "@/assets/images/img-variant-wet soil.png";

const Aromas = [
  { id: "apple", label: "사과", image: variantApple },
  { id: "cherry", label: "체리", image: variantCherry },
  { id: "chocolate", label: "초콜렛", image: variantChocolate },
  { id: "citrus", label: "시트러스", image: variantCitrus },
  { id: "coconut", label: "코코넛", image: variantCoconut },
  { id: "flower", label: "꽃", image: variantFlower },
  { id: "grass", label: "풀", image: variantGrass },
  { id: "herb", label: "허브", image: variantHerb },
  { id: "mineral", label: "미네랄", image: variantMineral },
  { id: "oak", label: "오크", image: variantOakCask },
  { id: "peach", label: "복숭아", image: variantPeach },
  { id: "grape", label: "포도", image: variantGrape },
  { id: "toast", label: "제빵", image: variantToast },
  { id: "tropical", label: "트로피칼", image: variantTropical },
  { id: "WetSoil", label: "흙흙", image: variantWetSoil },
];

export function ReviewAroma() {
  return (
    <div className={styles.reviewAromaWrap}>
      {Aromas.map((aroma) => (
        <div key={aroma.id} className={styles.reviewAroma}>
          {aroma.label}
        </div>
      ))}
    </div>
  );
}

export function DetailAroma() {
  return (
    <div className={styles.detailAroma}>
      <div className={styles.detailAromaTop}>
        <p className={styles.title}>어떤 향이 있나요?</p>
        <p className={styles.users}>(53명 참여)</p>
      </div>
      <div className={styles.detailAromaWrap}>
        {Aromas.map((aroma) => (
          <div key={aroma.id} className={styles.detailAroma}>
            <img src={aroma.image} alt={aroma.label} width={40} height={40} />
            <span className={styles.label}>{aroma.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
