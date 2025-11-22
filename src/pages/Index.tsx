import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Calendar } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';

interface Entry {
  id: string;
  date: Date;
  content: string;
  mood: 'great' | 'good' | 'okay' | 'bad';
}

interface Insight {
  period: string;
  summary: string;
  keyThemes: string[];
  moodTrend: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('entries');
  const [newEntry, setNewEntry] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [entries] = useState<Entry[]>([
    {
      id: '1',
      date: new Date(2024, 10, 20),
      content: 'Сегодня был продуктивный день. Завершил несколько важных задач и чувствую удовлетворение от проделанной работы.',
      mood: 'great'
    },
    {
      id: '2',
      date: new Date(2024, 10, 19),
      content: 'Встреча с командой прошла отлично. Обсудили новые идеи для проекта.',
      mood: 'good'
    },
    {
      id: '3',
      date: new Date(2024, 10, 18),
      content: 'Немного устал, но в целом день прошёл нормально.',
      mood: 'okay'
    }
  ]);

  const insights: Insight[] = [
    {
      period: 'Сегодня',
      summary: 'Ваш день был полон продуктивности. Вы сосредоточены на работе и достигаете поставленных целей.',
      keyThemes: ['Продуктивность', 'Работа', 'Достижения'],
      moodTrend: 'Отличное настроение'
    },
    {
      period: 'Эта неделя',
      summary: 'На этой неделе вы показали высокую продуктивность. Преобладают позитивные эмоции и профессиональный рост.',
      keyThemes: ['Командная работа', 'Проекты', 'Развитие'],
      moodTrend: 'Стабильно хорошее'
    },
    {
      period: 'Этот месяц',
      summary: 'Месяц был наполнен новыми вызовами и возможностями. Вы активно развиваетесь и достигаете целей.',
      keyThemes: ['Карьера', 'Обучение', 'Баланс'],
      moodTrend: 'Позитивная динамика'
    }
  ];

  const moodEmoji = {
    great: '😊',
    good: '🙂',
    okay: '😐',
    bad: '😔'
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'great': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'okay': return 'bg-yellow-500';
      case 'bad': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-semibold text-foreground mb-2">Мой Дневник</h1>
          <p className="text-muted-foreground">AI-анализ вашей жизни</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="entries" className="flex items-center gap-2">
              <Icon name="BookOpen" size={18} />
              <span className="hidden sm:inline">Записи</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Icon name="Sparkles" size={18} />
              <span className="hidden sm:inline">Инсайты</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Icon name="BarChart3" size={18} />
              <span className="hidden sm:inline">Аналитика</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Icon name="Calendar" size={18} />
              <span className="hidden sm:inline">Календарь</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="entries" className="space-y-6">
            <Card className="p-6 border-border/50 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="PenLine" size={20} />
                Новая запись
              </h2>
              <Textarea
                placeholder="Как прошёл ваш день? Что вы чувствуете?.."
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                className="min-h-[120px] resize-none mb-4 border-border/50"
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {(['great', 'good', 'okay', 'bad'] as const).map((mood) => (
                    <Button
                      key={mood}
                      variant="outline"
                      size="sm"
                      className="text-2xl hover:scale-110 transition-transform"
                    >
                      {moodEmoji[mood]}
                    </Button>
                  ))}
                </div>
                <Button className="gap-2">
                  <Icon name="Save" size={16} />
                  Сохранить
                </Button>
              </div>
            </Card>

            <div className="space-y-4">
              {entries.map((entry) => (
                <Card key={entry.id} className="p-6 border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getMoodColor(entry.mood)}`} />
                      <span className="text-sm text-muted-foreground">
                        {entry.date.toLocaleDateString('ru-RU', { 
                          day: 'numeric', 
                          month: 'long',
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    <span className="text-2xl">{moodEmoji[entry.mood]}</span>
                  </div>
                  <p className="text-foreground leading-relaxed">{entry.content}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            {insights.map((insight, idx) => (
              <Card key={idx} className="p-6 border-border/50 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Sparkles" size={20} className="text-primary" />
                  <h3 className="text-xl font-semibold">{insight.period}</h3>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">{insight.summary}</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">Ключевые темы:</p>
                    <div className="flex flex-wrap gap-2">
                      {insight.keyThemes.map((theme, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Icon name="TrendingUp" size={16} className="text-primary" />
                    <p className="text-sm font-medium">{insight.moodTrend}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="p-6 border-border/50 shadow-sm">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Icon name="Activity" size={20} />
                Динамика настроения
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <span className="text-xl">😊</span> Отличное
                    </span>
                    <span className="text-sm text-muted-foreground">40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <span className="text-xl">🙂</span> Хорошее
                    </span>
                    <span className="text-sm text-muted-foreground">35%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <span className="text-xl">😐</span> Нормальное
                    </span>
                    <span className="text-sm text-muted-foreground">20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <span className="text-xl">😔</span> Плохое
                    </span>
                    <span className="text-sm text-muted-foreground">5%</span>
                  </div>
                  <Progress value={5} className="h-2" />
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 border-border/50 shadow-sm text-center">
                <Icon name="FileText" size={32} className="mx-auto mb-3 text-primary" />
                <p className="text-3xl font-bold mb-1">24</p>
                <p className="text-sm text-muted-foreground">Записей в этом месяце</p>
              </Card>
              <Card className="p-6 border-border/50 shadow-sm text-center">
                <Icon name="Flame" size={32} className="mx-auto mb-3 text-primary" />
                <p className="text-3xl font-bold mb-1">7</p>
                <p className="text-sm text-muted-foreground">Дней подряд</p>
              </Card>
              <Card className="p-6 border-border/50 shadow-sm text-center">
                <Icon name="Heart" size={32} className="mx-auto mb-3 text-primary" />
                <p className="text-3xl font-bold mb-1">8.5</p>
                <p className="text-sm text-muted-foreground">Средний уровень счастья</p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card className="p-6 border-border/50 shadow-sm">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Icon name="CalendarDays" size={20} />
                Ваши записи
              </h3>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-lg border-0"
                />
              </div>
            </Card>

            {selectedDate && (
              <Card className="p-6 border-border/50 shadow-sm">
                <h4 className="text-lg font-semibold mb-4">
                  {selectedDate.toLocaleDateString('ru-RU', { 
                    day: 'numeric', 
                    month: 'long',
                    year: 'numeric' 
                  })}
                </h4>
                <p className="text-muted-foreground">
                  {entries.find(e => e.date.toDateString() === selectedDate.toDateString())?.content || 
                   'Нет записей на эту дату'}
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
