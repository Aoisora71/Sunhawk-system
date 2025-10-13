export interface SurveyQuestion {
  id: number
  category: string
  question: string
  type: "scale" | "text"
}

export const surveyQuestions: SurveyQuestion[] = [
  // リーダーシップ (13問)
  { id: 1, category: "リーダーシップ", question: "上司は明確なビジョンを示していますか？", type: "scale" },
  { id: 2, category: "リーダーシップ", question: "上司は適切な指導とサポートを提供していますか？", type: "scale" },
  { id: 3, category: "リーダーシップ", question: "上司は公平な評価を行っていますか？", type: "scale" },
  { id: 4, category: "リーダーシップ", question: "上司は部下の意見を尊重していますか？", type: "scale" },
  { id: 5, category: "リーダーシップ", question: "上司は率先して行動していますか？", type: "scale" },
  { id: 6, category: "リーダーシップ", question: "上司は適切な権限委譲を行っていますか？", type: "scale" },
  { id: 7, category: "リーダーシップ", question: "上司は部下の成長を支援していますか？", type: "scale" },
  { id: 8, category: "リーダーシップ", question: "上司は困難な状況でも冷静に対応していますか？", type: "scale" },
  { id: 9, category: "リーダーシップ", question: "上司は組織の目標達成に向けて努力していますか？", type: "scale" },
  { id: 10, category: "リーダーシップ", question: "上司は部下のモチベーションを高めていますか？", type: "scale" },
  { id: 11, category: "リーダーシップ", question: "上司は変化に柔軟に対応していますか？", type: "scale" },
  { id: 12, category: "リーダーシップ", question: "上司は倫理的な行動を示していますか？", type: "scale" },
  { id: 13, category: "リーダーシップ", question: "上司は組織の価値観を体現していますか？", type: "scale" },

  // チームワーク (13問)
  { id: 14, category: "チームワーク", question: "チームメンバー間で協力し合っていますか？", type: "scale" },
  { id: 15, category: "チームワーク", question: "チーム内で情報共有が適切に行われていますか？", type: "scale" },
  { id: 16, category: "チームワーク", question: "チームの目標が明確に共有されていますか？", type: "scale" },
  { id: 17, category: "チームワーク", question: "チームメンバーは互いを尊重していますか？", type: "scale" },
  { id: 18, category: "チームワーク", question: "チーム内で建設的な議論が行われていますか？", type: "scale" },
  {
    id: 19,
    category: "チームワーク",
    question: "チームメンバーは責任を持って業務に取り組んでいますか？",
    type: "scale",
  },
  { id: 20, category: "チームワーク", question: "チーム内で助け合う文化がありますか？", type: "scale" },
  { id: 21, category: "チームワーク", question: "チームの意思決定プロセスは適切ですか？", type: "scale" },
  { id: 22, category: "チームワーク", question: "チームメンバーの役割分担は明確ですか？", type: "scale" },
  { id: 23, category: "チームワーク", question: "チーム内で問題が発生した際、適切に対処していますか？", type: "scale" },
  { id: 24, category: "チームワーク", question: "チームの雰囲気は良好ですか？", type: "scale" },
  { id: 25, category: "チームワーク", question: "チームメンバーは互いの強みを活かしていますか？", type: "scale" },
  { id: 26, category: "チームワーク", question: "チーム全体で成果を祝う文化がありますか？", type: "scale" },

  // コミュニケーション (13問)
  { id: 27, category: "コミュニケーション", question: "上司と部下のコミュニケーションは円滑ですか？", type: "scale" },
  { id: 28, category: "コミュニケーション", question: "部門間の連携は適切に行われていますか？", type: "scale" },
  { id: 29, category: "コミュニケーション", question: "重要な情報が適時に共有されていますか？", type: "scale" },
  { id: 30, category: "コミュニケーション", question: "会議は効率的に運営されていますか？", type: "scale" },
  {
    id: 31,
    category: "コミュニケーション",
    question: "意見や提案を自由に発言できる雰囲気がありますか？",
    type: "scale",
  },
  { id: 32, category: "コミュニケーション", question: "フィードバックは建設的に行われていますか？", type: "scale" },
  { id: 33, category: "コミュニケーション", question: "報告・連絡・相談が適切に行われていますか？", type: "scale" },
  {
    id: 34,
    category: "コミュニケーション",
    question: "コミュニケーションツールは効果的に活用されていますか？",
    type: "scale",
  },
  { id: 35, category: "コミュニケーション", question: "誤解や行き違いが少ないですか？", type: "scale" },
  {
    id: 36,
    category: "コミュニケーション",
    question: "上層部からのメッセージは明確に伝わっていますか？",
    type: "scale",
  },
  { id: 37, category: "コミュニケーション", question: "現場の声は上層部に届いていますか？", type: "scale" },
  { id: 38, category: "コミュニケーション", question: "コミュニケーションの頻度は適切ですか？", type: "scale" },
  {
    id: 39,
    category: "コミュニケーション",
    question: "非言語コミュニケーションも大切にされていますか？",
    type: "scale",
  },

  // 業務効率 (13問)
  { id: 40, category: "業務効率", question: "業務プロセスは効率的ですか？", type: "scale" },
  { id: 41, category: "業務効率", question: "無駄な作業や重複作業は少ないですか？", type: "scale" },
  { id: 42, category: "業務効率", question: "適切なツールやシステムが導入されていますか？", type: "scale" },
  { id: 43, category: "業務効率", question: "業務の優先順位は明確ですか？", type: "scale" },
  { id: 44, category: "業務効率", question: "時間管理は適切に行われていますか？", type: "scale" },
  { id: 45, category: "業務効率", question: "業務マニュアルや手順書は整備されていますか？", type: "scale" },
  { id: 46, category: "業務効率", question: "業務改善の取り組みが行われていますか？", type: "scale" },
  { id: 47, category: "業務効率", question: "リソースは適切に配分されていますか？", type: "scale" },
  { id: 48, category: "業務効率", question: "業務の標準化が進んでいますか？", type: "scale" },
  { id: 49, category: "業務効率", question: "ボトルネックは適切に解消されていますか？", type: "scale" },
  { id: 50, category: "業務効率", question: "業務の見える化が進んでいますか？", type: "scale" },
  { id: 51, category: "業務効率", question: "デジタル化・自動化が推進されていますか？", type: "scale" },
  { id: 52, category: "業務効率", question: "業務の品質は高く保たれていますか？", type: "scale" },

  // イノベーション (13問)
  { id: 53, category: "イノベーション", question: "新しいアイデアが歓迎される文化がありますか？", type: "scale" },
  { id: 54, category: "イノベーション", question: "失敗を恐れずチャレンジできる環境ですか？", type: "scale" },
  { id: 55, category: "イノベーション", question: "改善提案制度は機能していますか？", type: "scale" },
  { id: 56, category: "イノベーション", question: "新しい技術や手法の導入に積極的ですか？", type: "scale" },
  { id: 57, category: "イノベーション", question: "創造性を発揮できる機会がありますか？", type: "scale" },
  { id: 58, category: "イノベーション", question: "他部門や外部との協働が促進されていますか？", type: "scale" },
  { id: 59, category: "イノベーション", question: "学習と成長の機会が提供されていますか？", type: "scale" },
  { id: 60, category: "イノベーション", question: "変化を前向きに捉える文化がありますか？", type: "scale" },
  { id: 61, category: "イノベーション", question: "実験的な取り組みが許容されていますか？", type: "scale" },
  { id: 62, category: "イノベーション", question: "イノベーションに対する投資が行われていますか？", type: "scale" },
  { id: 63, category: "イノベーション", question: "多様な視点が尊重されていますか？", type: "scale" },
  { id: 64, category: "イノベーション", question: "業界のトレンドや最新情報が共有されていますか？", type: "scale" },
  { id: 65, category: "イノベーション", question: "イノベーションの成果が評価されていますか？", type: "scale" },

  // 顧客志向 (13問)
  { id: 66, category: "顧客志向", question: "顧客のニーズを理解していますか？", type: "scale" },
  { id: 67, category: "顧客志向", question: "顧客満足度の向上に取り組んでいますか？", type: "scale" },
  { id: 68, category: "顧客志向", question: "顧客からのフィードバックを活用していますか？", type: "scale" },
  { id: 69, category: "顧客志向", question: "顧客対応は迅速かつ丁寧ですか？", type: "scale" },
  { id: 70, category: "顧客志向", question: "顧客の期待を超えるサービスを提供していますか？", type: "scale" },
  { id: 71, category: "顧客志向", question: "顧客との長期的な関係構築を重視していますか？", type: "scale" },
  { id: 72, category: "顧客志向", question: "顧客の声が組織全体に共有されていますか？", type: "scale" },
  { id: 73, category: "顧客志向", question: "顧客視点での業務改善が行われていますか？", type: "scale" },
  { id: 74, category: "顧客志向", question: "顧客満足度を測定していますか？", type: "scale" },
  { id: 75, category: "顧客志向", question: "顧客の問題解決に全力で取り組んでいますか？", type: "scale" },
  { id: 76, category: "顧客志向", question: "顧客との信頼関係は良好ですか？", type: "scale" },
  { id: 77, category: "顧客志向", question: "顧客価値の創造を意識していますか？", type: "scale" },
  { id: 78, category: "顧客志向", question: "顧客志向の文化が組織に根付いていますか？", type: "scale" },
]

export const categories = [
  "リーダーシップ",
  "チームワーク",
  "コミュニケーション",
  "業務効率",
  "イノベーション",
  "顧客志向",
]
