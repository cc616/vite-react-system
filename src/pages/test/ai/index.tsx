import { Button, Checkbox, CheckboxChangeEvent, Select } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';

import Content from '@/components/content';

import dataJson from './data.json';
import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';
import image4 from './image4.png';
import image5 from './image5.png';
import image6 from './image6.png';
import image7 from './image7.png';
import image8 from './image8.png';
import image9 from './image9.png';
import image10 from './image10.png';
import image11 from './image11.png';
import image12 from './image12.png';
import image13 from './image13.png';
import image14 from './image14.png';
import image15 from './image15.png';
import image16 from './image16.png';
import image17 from './image17.png';
import image18 from './image18.png';
import image19 from './image19.png';
import styles from './index.module.less';

interface IItem {
  id: number;
  optionList?: {
    id: number;
    selected: 1 | 0;
    text: string;
  }[];
  questions: Array<string | { src: string }>;
  explanations?: Array<string | { src: string }>;
  help?: string;
  answers?: string;
}

const anserIndexMap: { [key: number]: string } = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
};

const imgMap: { [key: string]: string } = {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
  image19,
};

const options = [
  {
    label: '题库',
    value: 'questionBank',
  },
  {
    label: '测试',
    value: 'test',
  },
];

const Index = () => {
  const [value, setValue] = useState('questionBank');
  const [testAnswer, setTestAnswer] = useState<{ [key: number]: number[] | undefined }>({});
  const [questions, setQuestions] = useState<IItem[]>([]);
  const [result, setResult] = useState<{ ids: number[]; score: number; errors: number[] }>();
  const [testOptions, setTestOptions] = useState<{label: string, value: number}[]>([]);
  const [selectedTest, setSelectedTest] = useState<number>();
  const testQuestionsRef = useRef<IItem[]>([]);
  const testGroupsRef = useRef<IItem[][]>([]);

  const isQuestion = useMemo(() => value === 'questionBank', [value]);

  const handleGenerateTest = () => {
    const data = dataJson as IItem[];
    const shuffled = data.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 分组
    const groups: IItem[][] = [];
    for (let i = 0; i < shuffled.length; i += 65) {
      groups.push(shuffled.slice(i, i + 65));
    }

    const lastGroup = groups[groups.length - 1];
    if (lastGroup.length < 65) {
      const needed = 65 - lastGroup.length;
      const previousItems = shuffled.slice(0, shuffled.length - lastGroup.length);

      for (let i = 0; i < needed; i++) {
        const randomItem = previousItems[Math.floor(Math.random() * previousItems.length)];
        lastGroup.push(randomItem);
      }

      groups[groups.length - 1] = lastGroup;
    }
    testQuestionsRef.current = shuffled;
    testGroupsRef.current = groups;
    const _options = [...groups.map((_, index) => ({ label: `测试${index + 1}`, value: index })), { label: '全部测试', value: -1 }];
    setTestOptions(_options);
    setSelectedTest(0);
    setQuestions(groups[0]);

  };

  useEffect(() => {
    const data = dataJson as IItem[];
    if (isQuestion) {
      setQuestions(data);
    } else {
      handleGenerateTest();
    }
  }, [isQuestion]);

  const handleSelectTest = (value: number) => {
    setSelectedTest(value);
    setTestAnswer({});
    setResult(undefined);
    if (value === -1) {
      setQuestions(testQuestionsRef.current);
    } else {
      const selectedQuestions = testGroupsRef.current[value] || [];
      setQuestions(selectedQuestions);
    }
  }

  const handleRefreshTest = () => {
    setTestAnswer({});
    setResult(undefined);
    handleGenerateTest();
  };

  const handleChangeType = (value: string) => {
    setValue(value);
    setTestAnswer({});
    setResult(undefined);
  };

  const handleChange = (id: number, optionId: number) => (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    setTestAnswer((prev) => ({
      ...prev,
      [id]: isChecked ? [...(prev[id] ?? []), optionId] : (prev[id] ?? []).filter((item) => item !== optionId),
    }));
  };

  const handleSubmitTest = () => {
    let score = 0;
    const ids: number[] = [];
    const errors: number[] = [];
    questions.forEach((item, index) => {
      const selectedIds = testAnswer[item.id] ?? [];
      const correctIds = (item.optionList ?? []).filter((option) => option.selected).map((option) => option.id);
      if (selectedIds.length && correctIds.length && selectedIds.every((id) => correctIds.includes(id))) {
        score += 20;
        ids.push(item.id);
      } else {
        errors.push(index + 1);
      }
    });
    setResult({ ids, score, errors });
  };

  return (
    <Content bgWhite className={styles.container}>
      <div className={styles.header}>
        <Select options={options} value={value} onChange={handleChangeType} />
        {!isQuestion && (
          <>
            <div>
              测试选择：
              <Select options={testOptions} value={selectedTest} onChange={handleSelectTest} />
            </div>
            <Button type="primary" onClick={handleRefreshTest}>
              重新测试
            </Button>
            <Button type="primary" onClick={handleSubmitTest}>
              提交答案
            </Button>
            {result && (
              <div>
                <span>分数：{result.score} &nbsp;&nbsp;</span>
                <span>错题数量：{result.errors.length} &nbsp;&nbsp;</span>
                <span>为：{result.errors.join(', ')}</span>
              </div>
            )}
          </>
        )}
      </div>
      <div className={styles.questionList}>
        {questions.map((item, index) => {
          const { id, optionList, questions, explanations, answers } = item;
          return (
            <div key={`${id}-${index}`} className={styles.item}>
              <div className={styles.title}>
                <div className={styles.bold}>QUESTION {index + 1}</div>
                {questions.map((i, j) =>
                  typeof i === 'string' ? (
                    <div key={j}>{i}</div>
                  ) : (
                    <img key={j} src={imgMap[i.src]} alt={`question-${j}`} className={styles.image} />
                  ),
                )}
                {result?.ids && !result.ids.includes(id) && (
                  <div className={styles.error}>
                    答案错误，正确答案为：
                    {optionList
                      ?.map((i, j) => (i.selected ? anserIndexMap[j] : undefined))
                      .filter(Boolean)
                      .join(',')}
                  </div>
                )}
              </div>
              {optionList && (
                <div className={styles.options}>
                  {optionList.map((option, j) => {
                    return (
                      <Checkbox
                        key={option.id}
                        disabled={isQuestion}
                        checked={isQuestion ? !!option.selected : testAnswer[id]?.includes(option.id)}
                        onChange={handleChange(id, option.id)}
                      >
                        {anserIndexMap[j]}. <span dangerouslySetInnerHTML={{ __html: option.text }} />
                      </Checkbox>
                    );
                  })}
                </div>
              )}
              {(isQuestion || result) && answers && (
                <div className={styles.explanations}>
                  <img src={imgMap[answers]} />
                </div>
              )}
              {(isQuestion || result) && explanations && (
                <div className={styles.explanations}>
                  <div className={styles.bold}>Explanation/Reference:</div>
                  {explanations.map((item, j) =>
                    typeof item === 'string' ? (
                      <div key={j}>{item}</div>
                    ) : (
                      <img key={j} src={imgMap[item.src]} alt={`explanation-${j}`} className={styles.image} />
                    ),
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Content>
  );
};

export default Index;
