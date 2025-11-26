import { useState } from "react";
import styles from "./style.module.scss";
import { Check } from "lucide-react";

export const LessonPage = () => {
  const [isActive, setIsActive] = useState(1);
  console.log(isActive);

  const lessons = [
    {
      id: 1,
      text: "Что такое личные финансы?",
      isCompleted: true,
      content: {
        type: "text",
        text: "Что такое личные финансы?",
        description: `Что такое личные финансы? Личные финансы — это управление деньгами конкретного человека или семьи. Сюда входят все решения и действия, которые помогают грамотно использовать доходы, контролировать расходы и достигать финансовых целей. Личные финансы охватывают несколько ключевых направлений: 1. Доходы Это все деньги, которые человек получает: зарплата, подработки, бизнес-доход, социальные выплаты, подарки и даже пассивные источники. 2. Расходы Все траты, которые человек делает ежедневно: еда, одежда, транспорт, развлечения, кредиты, аренда жилья и др. Важно уметь контролировать расходы, чтобы не тратить больше, чем зарабатываешь.`,
      },
    },
    {
      id: 2,
      text: "Понятие бюджета",
      type: "text",
      isCompleted: true,
      content: {
        type: "text",
        text: "Часть доходов",
        description:
          "3. Сбережения Часть доходов, которые откладываются для будущего. Сбережения создают «подушку безопасности» и формируют основу для крупных покупок или инвестиций. 4. Бюджетирование Процесс планирования доходов и расходов. Бюджет помогает понимать, куда уходят деньги, и управлять ими более осознанно. 5. Инвестирование Использование сбережений, чтобы увеличить капитал: акции, облигации, фонды, недвижимость и другие инструменты. Инвестиции помогают достигать долгосрочных целей — например, купить квартиру или выйти на пенсию с хорошими накоплениями.",
      },
    },
    {
      id: 3,
      text: "Классифицируй расходы",
      type: "text",
      isCompleted: false,
      content: {
        type: "text",
        text: "Финансовые цели",
        description:
          "6. Управление долгами и кредитами Ответственное использование заемных средств. Важно понимать, какие кредиты выгодны, а какие могут навредить финансовому состоянию. 7. Финансовые цели Это планы на будущее: накопить на образование, машину, отпуск, создать подушку безопасности, инвестировать в будущее. Цели помогают понимать, зачем мы управляем финансами. Зачем нужны личные финансы? Грамотное управление деньгами помогает: избежать долгов и стрессов; уверенно чувствовать себя в непредвиденных ситуациях; достигать больших жизненных целей; повышать уровень жизни и свободу выбора.",
      },
    },
  ];

  return (
    <main className={styles.Lesson}>
      <h1 className={styles.LessonTitle}>Основы личных финансов</h1>
      <p className={styles.LessonDescription}>
        Изучи базовые принципы финансовой грамотности, научись планировать
        бюджет и управлять расходами.
      </p>

      <div className={styles.LessonBlock}>
        <div className={styles.LessonBlockItem}>
          <h2 className={styles.LessonBlockTitle}>Уроки</h2>
          <ul className={styles.LessonList}>
            {lessons.map((lesson) => (
              <li
                onClick={() => setIsActive(lesson.id)}
                className={
                  lesson.id === isActive
                    ? styles.LessonListItemActive
                    : styles.LessonListItem
                }
              >
                <Check
                  className={
                    lesson.isCompleted
                      ? styles.LessonIconSuccess
                      : styles.LessonIcon
                  }
                  color="green"
                />
                <span>
                  {lesson.id}. {lesson.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.LessonBlockItem}>
          {lessons.map((lesson) => (
            <div
              className={
                lesson.id === isActive ? styles.display : styles.displayNone
              }
            >
              <h3>{lesson.content.text} </h3>
              <p>{lesson.content.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
