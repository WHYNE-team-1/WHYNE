import ImgAddButton from '@/components/common/ImgAddButton';

export default function ImageAddButton() {
  return (
    <div
      style={{ margin: 24, display: 'flex', gap: 24, alignItems: 'flex-end' }}
    >
      <ImgAddButton />
      <ImgAddButton error />
      <ImgAddButton src="https://www.shinsegae-lnb.com/upload/product/wine/wine/images/G7%20%EA%B9%8C%EB%B2%A0%EB%A5%B4%EB%84%A4%20%EC%86%8C%EB%B9%84%EB%87%BD%20(%EB%B9%84%EA%B1%B4).jpg" />
    </div>
  );
}
