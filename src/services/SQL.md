```sql
select distinct student.id, student.email from student
    join teaches
        on student.id = teaches.student_id
    left join suspension
        on student.id = suspension.student_id
            where (teacher_id = 11 OR student.id in (102,106,131,144))
            and suspension.active is not true;
```

```sql
select email from student where id in (
    select student_id
    from teaches
    where teacher_id in
          (select id
           from teacher
           where email in ('Boyd.Zboncak@hotmail.com', 'Angeline_Waelchi36@hotmail.com'))
    group by student_id
    HAVING count(*) = 2
);
```
