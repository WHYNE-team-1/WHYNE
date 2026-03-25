import { useState } from 'react';
import Input from '@/components/common/Input';

export default function InputSample() {
  // 일반용 상태 관리
  const [nickname, setNickname] = useState('');
  const [nicknameStatus, setNicknameStatus] = useState<'default' | 'error'>(
    'default'
  );
  const [nicknameError, setNicknameError] = useState('');

  const handleNicknameBlur = () => {
    // 20자 초과 시 에러
    if (nickname.length > 20) {
      setNicknameStatus('error');
      setNicknameError('닉네임은 최대 20자까지 가능합니다');
    } else {
      setNicknameStatus('default');
      setNicknameError('');
    }
  };

  // 모달용 상태 관리
  const [modalName, setModalName] = useState('');
  const [modalNameStatus, setModalNameStatus] = useState<
    'default' | 'modalError'
  >('default');
  const [modalNameError, setModalNameError] = useState('');

  const handleModalNameBlur = () => {
    // 빈 값일 시 모달 에러
    if (modalName.trim() === '') {
      setModalNameStatus('modalError');
      setModalNameError('이름을 입력해주세요');
    } else {
      setModalNameStatus('default');
      setModalNameError('');
    }
  };

  return (
    <div
      style={{
        padding: '50px',
        minHeight: '100vh',
      }}
    >
      <h1
        style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}
      >
        인풋 컴포넌트 테스트 페이지
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          maxWidth: '500px',
        }}
      >
        {/* 일반 입력창 */}
        <div
          style={{
            backgroundColor: '#fff',
            padding: '30px',
          }}
        >
          <h2
            style={{
              fontSize: '16px',
              marginBottom: '20px',
              color: '#333',
            }}
          >
            1. 일반 입력창
          </h2>
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              // 다시 입력하기 시작하면 일반 상태로 변경 (에러 상태 -> 일반 상태)
              if (nicknameStatus === 'error') {
                setNicknameStatus('default');
                setNicknameError('');
              }
            }}
            onBlur={handleNicknameBlur}
            status={nicknameStatus}
            errorMessage={nicknameError}
          />
          <p style={{ fontSize: '12px', color: '#aaa', marginTop: '12px' }}>
            현재 글자 수: {nickname.length} / 20 (21자 이상 입력하면 에러
            발생합니다)
          </p>
        </div>

        {/* 모달 입력창 */}
        <div
          style={{
            backgroundColor: '#fff',
            padding: '30px',
          }}
        >
          <h2
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: '#333',
            }}
          >
            2. 모달 입력창
          </h2>
          <Input
            label="이름"
            placeholder="이름을 입력해주세요"
            value={modalName}
            onChange={(e) => {
              setModalName(e.target.value);
              if (modalNameStatus === 'modalError') {
                setModalNameStatus('default');
                setModalNameError('');
              }
            }}
            onBlur={handleModalNameBlur} // 마우스 나갈 때 빈 값인지 검사
            status={modalNameStatus} // 모달 에러용 status 적용
            errorMessage={modalNameError}
          />
          <p style={{ fontSize: '12px', color: '#aaa', marginTop: '12px' }}>
            (아무것도 입력하지 않고 바깥을 클릭하면 에러 발생합니다)
          </p>
        </div>
      </div>
    </div>
  );
}
