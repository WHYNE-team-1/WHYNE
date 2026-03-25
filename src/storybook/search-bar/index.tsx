import { useState } from 'react';
import SearchBar from '@/components/common/SearchBar';

export default function SearchBarSample() {
  const [searchValue, setSearchValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');

  return (
    <div
      style={{
        maxWidth: '600px',
        padding: '40px 40px',
      }}
    >
      <h1
        style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px' }}
      >
        SearchBar 테스트 페이지
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div>
          <SearchBar
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearchSubmit={() => {
              if (searchValue.trim() === '') {
                alert('검색어를 입력해주세요!');
                return;
              }
              setSubmittedValue(searchValue);
              alert(`'${searchValue}' (으)로 검색합니다.`);
            }}
          />

          <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            실시간 입력값: {searchValue}
          </p>

          {submittedValue && (
            <p
              style={{
                marginTop: '10px',
                fontSize: '14px',
              }}
            >
              최종 검색어: {submittedValue}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
