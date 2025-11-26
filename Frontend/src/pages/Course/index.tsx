import { Link } from "@tanstack/react-router";
import styles from "./style.module.scss";
import { CirclePlayIcon, CircleUser, BadgeJapaneseYen } from "lucide-react";

export const CoursePage = () => {
  const courses = [
    {
      id: 1,
      name: "Финансовая грамотность для начинающих",
      lessons: "6",
      progress: "40",
      icon: <CirclePlayIcon className={styles.CourseIcon} size={60} />,
    },
    {
      id: 2,
      name: "Основы личных финансов",
      lessons: "8",
      progress: "40",
      icon: <CircleUser className={styles.CourseIcon} size={60} />,
    },
    {
      id: 3,
      name: "Основы финансов",
      lessons: "10",
      progress: "40",
      icon: <BadgeJapaneseYen className={styles.CourseIcon} size={60} />,
    },
    {
      id: 4,
      name: "Финансовая грамотность для начинающих",
      lessons: "6",
      progress: "40",
      icon: <CirclePlayIcon className={styles.CourseIcon} size={60} />,
    },
    {
      id: 5,
      name: "Основы личных финансов",
      lessons: "8",
      progress: "40",
      icon: <CircleUser className={styles.CourseIcon} size={60} />,
    },
    {
      id: 6,
      name: "Основы финансов",
      lessons: "10",
      progress: "40",
      icon: <BadgeJapaneseYen className={styles.CourseIcon} size={60} />,
    },
  ];

  return (
    <main className={styles.Course}>
      <h1 className={styles.CourseTitle}>Каталог курсов</h1>
      <h2 className={styles.CourseSubtitle}>
        Начните свой путь в мире финансов
      </h2>

      <ul className={styles.CourseSort}>
        <li>
          <Link className={styles.CourseSortItemActive} to="/">
            Все курсы
          </Link>
        </li>
        <li>
          <Link className={styles.CourseSortItem} to="/">
            Новые
          </Link>
        </li>
        <li>
          <Link className={styles.CourseSortItem} to="/">
            Популярные
          </Link>
        </li>
      </ul>

      <div className={styles.CourseList}>
        {courses.map((course) => (
          <div className={styles.CourseItem}>
            <div className={styles.CourseContent}>
              <h3 className={styles.CourseName}>{course.name}</h3>
              <span className={styles.CourseLesson}>
                Всего {course.lessons} уроков
              </span>
              <div className={styles.CourseProgress}>
                <div className={styles.CourseProgressBar}></div>
                <span>{course.progress} %</span>
              </div>
              <Link className={styles.CourseBtn} to="/">
                Начать курс
              </Link>
            </div>
            {course.icon}
          </div>
        ))}
      </div>
    </main>
  );
};
