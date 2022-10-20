INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO role  (title, salary, department_id) 
VALUES ( "sales Lead", 100000, 4 ),
       ("salesperson", 80000, 4),
       ("Lead Engineer", 150000, 1),
       ("Software Engineer", 120000, 1),
       ("Account Manager", 160000, 2),
       ("Accountant", 125000, 2),
       ("Leagl Team Lead", 250000, 3), 
       ("lawyer", 190000, 3);   

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jerry", "Smith", 1, NULL),
       ("Sally", "Sue", 2, 1),
       ("Bob", "Ross", 3, 1),
       ("Rick", "Sanchez", 4, NULL),
       ("Barbara", "Jones", 5, 4),
       ("Michael", "Ericson", 6, 4),
       ("Morty", "Mortison", 7, NULL),
       ("Sarah", "Henderson", 8, 7),
       ("Bill", "Hicks", 7, 7),
       ("Paul", "Paulson", 6, NULL),
       ("Bill", "Hicks", 3, 10),
       ("Larry", "David", 1, 10);
          