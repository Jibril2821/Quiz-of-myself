'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: '性別は？', c: ['男', '女']},
    {q: '年齢は？(2020/3/20現在)', c: ['１９', '１６', '２２']},
    {q: '血液型は？', c: ['O型', 'B型', 'A型', 'AB型']},
    {q: '趣味は？', c: ['ゲーム', '歌うこと', 'YouTube見ること']},
    {q: '好きな歌手は？', c: ['ファンキーモンキーベイビーズ', 'Mrs.GREEN APPLE', 'Official髭男dism']},
    {q: '形態の通信会社は？', c: ['ドコモ', 'au', 'ソフトバンク']},
    {q: '中学時代の所属部活は？', c: ['サッカー部', '帰宅部', 'バスケ部']},
    {q: '小学生のころ好きだった給食は？', c: ['あげパン', 'カレー', 'チリコンカン']},
    {q: '今欲しい物は？', c: ['モニター', 'Mac Book', 'お金']},
    {q: '好きな季節は？', c: ['春', '夏', '秋', '冬']},
    {q: '好きな教科は？', c: ['物理', '数学', '化学', '生物', '英語']},
    {q: 'ペットにするなら？', c: ['犬', '猫']},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;


  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
    question.textContent = `Q${currentNum + 1}: ${quizSet[currentNum].q}`;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);

    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}
