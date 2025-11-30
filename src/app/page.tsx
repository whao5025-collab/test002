'use client';

import { useState } from 'react';

// 1. 定义题目数据
const questions = [
  {
    id: 1,
    title: "周末早晨，你通常会怎么度过？",
    options: [
      { text: "睡到自然醒，在家点外卖追剧", type: "I" }, // I 代表内向
      { text: "早起约朋友去公园晨跑或吃早餐", type: "E" }, // E 代表外向
    ]
  },
  {
    id: 2,
    title: "在聚会上，你通常是？",
    options: [
      { text: "待在角落，只和熟悉的人聊天", type: "I" },
      { text: "活跃气氛，主动认识新朋友", type: "E" },
    ]
  },
  {
    id: 3,
    title: "遇到烦心事，你会？",
    options: [
      { text: "一个人独处，自我消化", type: "I" },
      { text: "找朋友倾诉，寻求建议", type: "E" },
    ]
  }
];

export default function Home() {
  // 游戏状态: 'start'(开始) | 'playing'(答题中) | 'result'(结果)
  const [gameStatus, setGameStatus] = useState<'start' | 'playing' | 'result'>('start');
  
  // 当前答到了第几题 (索引从0开始)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // 记录分数 (简单版：只记录 E 和 I 的数量)
  const [score, setScore] = useState({ E: 0, I: 0 });

  // 重新开始
  const restartGame = () => {
    setGameStatus('start');
    setCurrentQuestionIndex(0);
    setScore({ E: 0, I: 0 });
  };

  // 处理点击选项
  const handleOptionClick = (type: string) => {
    // 1. 更新分数
    const newScore = { ...score, [type]: score[type as keyof typeof score] + 1 };
    setScore(newScore);

    // 2. 判断还有没有下一题
    if (currentQuestionIndex + 1 < questions.length) {
      // 还有题，跳下一题
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 没题了，去结算页
      setGameStatus('result');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-4">
      
      {/* --- 场景1：开始封面 --- */}
      {gameStatus === 'start' && (
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-white/50 animate-fade-in">
          <div className="text-6xl mb-4">💖</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">恋爱性格测试</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            你是主动出击的猎手，<br/>还是等待被爱的睡美人？
          </p>
          <button 
            onClick={() => setGameStatus('playing')}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition hover:scale-105 active:scale-95 text-lg"
          >
            开始测试 ✨
          </button>
        </div>
      )}

      {/* --- 场景2：答题中 --- */}
      {gameStatus === 'playing' && (
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full animate-fade-in-up">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-pink-500 bg-pink-100 px-2 py-1 rounded">
              第 {currentQuestionIndex + 1} / {questions.length} 题
            </span>
          </div>
          
          <h2 className="text-xl font-bold text-gray-800 mb-6 min-h-[60px]">
            {questions[currentQuestionIndex].title}
          </h2>
          
          <div className="space-y-3">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button 
                key={index}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-pink-400 hover:bg-pink-50 transition-all text-gray-700 active:scale-98"
                onClick={() => handleOptionClick(option.type)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* --- 场景3：结果页 --- */}
      {gameStatus === 'result' && (
        <div className="bg-white/90 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center animate-bounce-in">
          <div className="text-6xl mb-4">
            {score.E > score.I ? '🔥' : '🌸'}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">你的测试结果</h2>
          
          <div className="my-6 p-4 bg-pink-50 rounded-xl">
            <h3 className="text-xl font-bold text-pink-600 mb-2">
              {score.E > score.I ? '热情奔放型恋人' : '温柔内敛型恋人'}
            </h3>
            <p className="text-gray-600 text-sm">
              {score.E > score.I 
                ? '你在感情中直率坦诚，喜欢就要大声说出来！充满了活力和感染力。' 
                : '你在感情中细腻敏感，更喜欢细水长流的陪伴，懂你的人会把你宠上天。'}
            </p>
          </div>

          <button 
            onClick={restartGame}
            className="w-full bg-gray-800 text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-900 transition"
          >
            再测一次 🔄
          </button>
        </div>
      )}
      
    </div>
  );
}