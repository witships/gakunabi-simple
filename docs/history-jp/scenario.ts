export const scenario = {
	courseId: 'jh_mathematics',
	courseName: 'ざっくり中学数学',
	thumbnail: 'jh_mathematics.png',
	subtitle: '数学嫌いだったあなたへ。実は面白い数学の世界！',
	description: '「数学は苦手…」そう感じている人も多いでしょう。',
	author: '有志の皆さん',
	index: [
		{
			partName: 'プロローグ',
			chapter: [
				{
					chapterId: 'orientation',
					chapterName: 'オリエンテーション',
					type: '',
					href: '/jh_mathematics/orientation',
					description: '皆さん、こんにちは。学習ナビゲーターのハルミナです。',
					public: true,
					learned: false,
					prerequisites: []
				},
				{
					chapterId: 'preTest',
					chapterName: '小学校の復習テスト',
					type: 'test',
					href: '/jh_mathematics/test/preTest',
					description:
						'今回は「マイナスの数について、学習していきましょう。別の言い方では「ふのすう」とも言います。',
					public: true,
					learned: false,
					prerequisites: []
				},
				{
					chapterId: 'guidance',
					chapterName: '中学数学のゴール',
					type: '',
					href: '/jh_mathematics/guidance',
					description:
						'いきなり結論を言ってしまうと、マイナスの数とは「0より小さい数のことを言います。',
					public: false,
					learned: false,
					prerequisites: [
						{
							chapterId: 'orientation',
							type: ''
						}
					]
				}
			]
		},
		{
			partName: '文字と式',
			chapter: [
				{
					chapterId: 'p01',
					chapterName: '正の数・負の数',
					type: '',
					href: '/jh_mathematics/p01',
					description:
						'身近な例では、気温が分かりやすいでしょう。北海道の冬の気温などで「マイナス4度」とか聞いたことがありますよね？',
					public: false,
					learned: false,
					prerequisites: [
						{
							chapterId: 'guidance',
							type: ''
						},
						{
							chapterId: 'preTest',
							type: 'recommended'
						}
					]
				},
				{
					chapterId: 'drill001',
					chapterName: '練習問題01',
					type: 'drill',
					href: '/jh_mathematics/drill/drill001',
					description:
						'身近な例では、気温が分かりやすいでしょう。北海道の冬の気温などで「マイナス4度」とか聞いたことがありますよね？',
					public: true,
					learned: false,
					prerequisites: [
						{
							chapterId: 'guidance',
							type: ''
						},
						{
							chapterId: 'preTest',
							type: 'recommended'
						}
					]
				},
				{
					chapterId: 'p02',
					chapterName: '平方根',
					type: '',
					href: '/jh_mathematics/p02',
					description:
						'こんな感じで、マイナスの数は普段の生活の中でも自然に使われているので、特別難しい話ではないでしょう。',
					public: false,
					learned: false,
					prerequisites: [
						{
							chapterId: 'p01',
							type: ''
						}
					]
				},
				{
					chapterId: 'p03',
					chapterName: '文字を用いた式',
					type: '',
					href: '/jh_mathematics/p03',
					description:
						'……といった説明だけで、簡単に納得できるようだったら、話は早いんですけどねぇ？',
					public: false,
					learned: false,
					prerequisites: [
						{
							chapterId: 'p02',
							type: ''
						}
					]
				},
				{
					chapterId: 'p04',
					chapterName: '素因数分解',
					type: '',
					href: '/jh_mathematics/p04',
					description:
						'0より小さいってどういうこと？　「リンゴがマイナス3個ある」とか言われても訳分かんないんだけど？',
					public: false,
					learned: false,
					prerequisites: [
						{
							chapterId: 'p03',
							type: ''
						}
					]
				},
				{
					chapterId: 'p05',
					chapterName: '方程式',
					type: '',
					href: '/jh_mathematics/p05',
					description:
						'マイナス1個でもマイナス3個でも、結局は1個もないっていうのが最終的な事実なんだから、全部0でいいんじゃないの？',
					public: false,
					learned: false,
					prerequisites: [
						{
							chapterId: 'p04',
							type: ''
						}
					]
				},
				{
					chapterId: 'test01',
					chapterName: '確認テスト',
					type: 'test',
					href: '/jh_mathematics/test/test01',
					description:
						'……みたいに疑問に感じる人もいるのではないでしょうか？　実は、同じように感じている人が、世界中にたっくさんいるんですよ？',
					public: false,
					learned: false,
					prerequisites: [
						{
							chapterId: 'p05',
							type: 'recommended'
						}
					]
				},
				{
					chapterId: 'note01',
					chapterName: '息抜きタイム',
					type: 'info',
					href: '/jh_mathematics/note01',
					description:
						'以前にもチラッとお話したように、数学の歴史は非常に古くて、メソポタミア文明やエジプト文明など、人類初期の古代文明の時からすでに実用されていました。',
					public: false,
					learned: false,
					prerequisites: [
						{
							chapterId: 'test01',
							type: ''
						}
					]
				}
			]
		},
		{
			partName: '関数',
			chapter: [
				{
					chapterId: 'p06',
					chapterName: '関数って何？',
					type: '',
					href: '/jh_mathematics/p06',
					description:
						'その長い歴史に対して、マイナスの数が発明されたのは7世紀ごろ、そしてそれが浸透したのは１７世紀頃だと言われています。',
					public: false,
					learned: false,
					prerequisites: [
						{
							chapterId: 'test01',
							type: ''
						},
						{
							chapterId: 'p05',
							type: ''
						}
					]
				},
				{
					chapterId: 'p07',
					chapterName: '比例とは',
					type: '',
					href: '/jh_mathematics/p07',
					description: 'そうだそうだ',
					public: false,
					learned: false,
					prerequisites: [
						{
							chapterId: 'p06',
							type: ''
						}
					]
				},
				{
					chapterId: 'p08',
					chapterName: '反比例とは',
					type: '',
					href: '/jh_mathematics/p08',
					description:
						'……ということで、マイナスの数についてもう少し知るために、「かず」そのものから改めて整理してみましょう',
					public: false,
					learned: false,
					prerequisites: [
						{
							chapterId: 'p07',
							type: ''
						}
					]
				},
				{
					chapterId: 'p09',
					chapterName: 'グラフの基本',
					type: '',
					href: '/jh_mathematics/p09',
					description:
						'いったんいっちばん根本的なところまで遡ると、そもそもかずとは「ものが幾つ有るかを数えるところから始まってますよね。',
					public: false,
					learned: false,
					prerequisites: [
						{
							chapterId: 'p08',
							type: ''
						}
					]
				},
				{
					chapterId: 'p10',
					chapterName: '比例のグラフ',
					type: '',
					href: '/jh_mathematics/p10',
					description:
						'「リンゴが1個有る」「リンゴが2個有る」「リンゴが3個有る」といったように、存在する量を数えること、それが数の最も根本的な役割です。',
					public: false,
					learned: false,
					prerequisites: [
						{
							chapterId: 'p09',
							type: ''
						}
					]
				},
				{
					chapterId: 'p11',
					chapterName: '反比例のグラフ',
					type: '',
					href: '/jh_mathematics/p11',
					description:
						'このことがしっかり頭の中にあるからこそ、マイナスの数について説明された時に……',
					public: false,
					learned: false,
					prerequisites: [
						{
							chapterId: 'p10',
							type: ''
						}
					]
				}
			]
		}
	]
};
