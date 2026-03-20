import { useState } from 'react';
import Textarea from '../../components/common/Textarea';

export default function TextareaTestPage() {
  const [content, setContent] = useState('');

  return (
    <div style={{ padding: '50px' }}>
      <h1>Textarea 컴포넌트 테스트</h1>
      
      <div style={{ width: '400px', marginTop: '20px', padding: '20px', backgroundColor: '#eee', borderRadius: '12px' }}>
        <Textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="후기를 작성해주세요"
          maxLength={400}
        />
        
        <p style={{ marginTop: '20px' }}>
          입력된 내용: {content}
        </p>
      </div>
    </div>
  );
}