import {
  ReviewScentCheckbox,
  FilterTypeCheckbox,
  FilterRatingCheckbox,
} from "@/components/common/CheckBox";

export default function CheckBoxStory() {
  return (
    <div
      style={{
        margin: 24,
        display: "flex",
        flexDirection: "column",
        gap: 32,
      }}
    >
      <ReviewScentCheckbox />
      <FilterTypeCheckbox />
      <FilterRatingCheckbox />
    </div>
  );
}
