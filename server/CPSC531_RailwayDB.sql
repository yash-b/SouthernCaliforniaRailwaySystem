

CREATE TABLE `department_info` (
  `DeptID` int(11) NOT NULL,
  `DeptName` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL
); 

INSERT INTO `department_info` (`DeptID`, `DeptName`, `Description`) VALUES
(1700, 'Conductor', 'Train Drivers'),
(1701, 'Administration', 'Handles employees and web admin'),
(1702, 'Custodian', 'Cleans train station and trains'),
(1703, 'Train Attendants', 'Assist Passengers on board'),
(1704, 'Security', 'Watches over the station and trains');



CREATE TABLE `employee_department` (
  `EmpID` int(11) NOT NULL,
  `DeptID` int(11) NOT NULL,
  `JobTitle` varchar(255) NOT NULL
); 



INSERT INTO `employee_department` (`EmpID`, `DeptID`, `JobTitle`) VALUES
(1345600, 1700, 'Train Operator'),
(1345601, 1701, 'SW Regional Manager'),
(1345602, 1702, 'Station Maintenance Manager'),
(1345603, 1703, 'Ticket Checker'),
(1345604, 1703, 'Ticket Checker'),
(1345605, 1700, 'Train Maintenance Engineer'),
(1345606, 1701, 'Station Master'),
(1345607, 1702, 'Station Janitor'),
(1345608, 1704, 'Security Staff'),
(1345609, 1704, 'Security Head');



CREATE TABLE `employee_info` (
  `EmpID` int(11) NOT NULL,
  `EmpFName` varchar(255) NOT NULL,
  `EmpLName` varchar(255) NOT NULL,
  `EmpPhoneNum` varchar(255) DEFAULT NULL,
  `EmpEmail` varchar(255) NOT NULL,
  `EmpPssw` varchar(255) NOT NULL
); 


INSERT INTO `employee_info` (`EmpID`, `EmpFName`, `EmpLName`, `EmpPhoneNum`, `EmpEmail`, `EmpPssw`) VALUES
(1345600, 'Gary', 'Holland', '626-895-6321', 'gholland@scrs.com', 'gholland600'),
(1345601, 'Lilia', 'Paresh', '323-562-7823', 'lparesh@scrs.com', 'lparesh601'),
(1345602, 'Timmy', 'Jackson', '909-425-8745', 'tjackson@scrs.com', 'tjackson602'),
(1345603, 'Susie', 'Jenkins', '626-852-4568', 'sjenkins@scrs.com', 'sjenkins603'),
(1345604, 'Ray', 'Johnson', NULL, 'rjohnson@scrs.com', 'rjohnson604'),
(1345605, 'Casey', 'jones', NULL, 'cjones@scrs.com', 'cjones605'),
(1345606, 'Brenda', 'Ortiz', '909-325-9763', 'bortiz@scrs.com', 'bortiz606'),
(1345607, 'Ashlynn', 'Rose', NULL, 'arose@scrs.com', 'arose607'),
(1345608, 'Thomas', 'Bledsoe', NULL, 'tbledsoe@scrs.com', 'tbledsoe608'),
(1345609, 'Michael', 'Scott', NULL, 'mscott@scrs.com', 'mscott609');


CREATE TABLE `passenger_info` (
  `PassID` int(11) NOT NULL,
  `PassFName` varchar(255) NOT NULL,
  `PassLName` varchar(255) NOT NULL,
  `PassPhoneNum` varchar(255) DEFAULT NULL,
  `PassEmail` varchar(255) NOT NULL,
  `PassPssw` varchar(255) NOT NULL
);


INSERT INTO `passenger_info` (`PassID`, `PassFName`, `PassLName`, `PassPhoneNum`, `PassEmail`, `PassPssw`) VALUES
(8854200, 'John', 'Clarke', '8182178499', 'jc27@aol.net', 'password'),
(8854201, 'Alfonso', 'Figueroa', '8189300422', 'herewego@gmail.com', 'password'),
(8854202, 'Richard', 'Stevenson', '8186469264', 'steverichy@gmail.com', 'password'),
(8854203, 'Chloe', 'Mendoza', '8188564234', 'mendozalove@yahoo.com', 'password'),
(8854204, 'Cindy', 'Famarz', '8188743956', 'cindster@outlook.com', 'password'),
(8854205, 'Aimee', 'Smith', '8180652874', 'aimsmith@gmail.com', 'password'),
(8854206, 'Josh', 'Karlsson', '8189845221', 'jkrolling@aol.net', 'password'),
(8854207, 'Alexis', 'Rodriguez', '8189543873', 'rodriguez_lexy@aol.net', 'password'),
(8854208, 'Lautaro', 'Martinez', '81812398564', 'martinez.l28@gmail.com', 'password'),
(8854209, 'Christian', 'Young', '8186349031', 'yc_30@gmail.com', 'password'),
(8854210, 'Bella', 'Freeman', '8189084526', 'bella_free@att.net', 'password');


CREATE TABLE `purchased_tickets` (
  `PassID` int(11) NOT NULL,
  `TrainSchedID` int(11) NOT NULL,
  `NumTickets` int(6) DEFAULT '1'
); 



INSERT INTO `purchased_tickets` (`PassID`, `TrainSchedID`, `NumTickets`) VALUES
(8854200, 125, 1),
(8854201, 126, 1),
(8854202, 127, 1),
(8854203, 125, 1),
(8854204, 127, 4),
(8854205, 128, 1),
(8854206, 129, 2),
(8854207, 130, 2),
(8854208, 130, 1),
(8854209, 135, 2);

CREATE TABLE `station_info` (
  `StationID` int(11) NOT NULL,
  `StationName` varchar(255) NOT NULL,
  `Location` varchar(255) NOT NULL
); 



INSERT INTO `station_info` (`StationID`, `StationName`, `Location`) VALUES
(9938600, 'LA Union Station', 'Los Angeles'),
(9938601, 'Burbank Station', 'Burbank'),
(9938602, 'Tustin Station', 'Tustin'),
(9938603, 'Irvine Station', 'Irvine'),
(9938604, 'Lake Forest Station', 'Lake Forest'),
(9938605, 'Costa Mesa Station', 'Costa Mesa'),
(9938606, 'Norwalk Station', 'Norwalk'),
(9938607, 'Oceanside Transportation Center', 'Oceanside'),
(9938608, 'Anaheim Regional Transportation Intermodal Center', 'Anaheim'),
(9938609, 'Oxnard City Station', 'Oxnard');



CREATE TABLE `train_info` (
  `TrainID` int(11) NOT NULL,
  `TrainName` varchar(255) NOT NULL,
  `TrainType` varchar(255) NOT NULL,
  `PassCapacity` int(6) NOT NULL,
  `Condition` varchar(255) DEFAULT NULL
); 


INSERT INTO `train_info` (`TrainID`, `TrainName`, `TrainType`, `PassCapacity`, `Condition`) VALUES
(1200, 'Altamont Corridor Express', 'Passenger', 200, 'In Service'),
(1201, 'Arrow', 'Passenger', 234, 'Under Construction'),
(1202, 'Metrolink', 'Passenger', 250, 'In Service'),
(1203, 'Los Angeles County Metro Rail', 'Passenger_Carrier', 300, 'In Service'),
(1204, 'OC Streetcar', 'Passenger', 425, 'Under Construction'),
(1205, 'San Diego Trolley', 'Passenger', 250, 'In Service'),
(1206, 'Sprinter', 'Passenger_Carrier', 200, 'In Service'),
(1207, 'Caltrain', 'Passenger', 300, 'In Service'),
(1208, 'Coliseum-Oakland International Airport Line', 'People Mover', 400, 'In Service'),
(1209, 'San Francisco Municipal Railway', 'Passenger', 450, 'In Service');


CREATE TABLE `train_schedule` (
  `TrainSchedID` int(11) NOT NULL,
  `TrainID` int(11) NOT NULL,
  `EmpID` int(11) NOT NULL,
  `CurrentStation` int(11) NOT NULL,
  `Destination` int(11) NOT NULL,
  `SchedDate` date NOT NULL,
  `DepartTime` time NOT NULL,
  `ArriveTime` time NOT NULL,
  `TicketsAvail` int(6) DEFAULT NULL
); 



INSERT INTO `train_schedule` (`TrainSchedID`, `TrainID`, `EmpID`, `CurrentStation`, `Destination`, `SchedDate`, `DepartTime`, `ArriveTime`, `TicketsAvail`) VALUES
(125, 1200, 1345600, 9938601, 9938600, '2021-01-03', '08:00:00', '08:30:00', 80),
(126, 1202, 1345603, 9938602, 9938600, '2021-01-03', '08:00:00', '08:30:00', 120),
(127, 1203, 1345604, 9938603, 9938600, '2021-01-03', '08:00:00', '08:30:00', 100),
(128, 1205, 1345605, 9938605, 9938600, '2021-01-03', '08:00:00', '08:30:00', 50),
(129, 1206, 1345600, 9938600, 9938601, '2021-01-03', '08:00:00', '08:30:00', 50),
(130, 1207, 1345603, 9938600, 9938602, '2021-01-03', '08:00:00', '08:30:00', 20),
(131, 1208, 1345604, 9938600, 9938603, '2021-01-03', '08:00:00', '08:30:00', 120),
(132, 1209, 1345605, 9938600, 9938604, '2021-01-03', '08:00:00', '08:30:00', 80),
(133, 1200, 1345605, 9938600, 9938605, '2021-01-03', '08:30:00', '09:00:00', 90),
(134, 1202, 1345605, 9938600, 9938606, '2021-01-03', '08:30:00', '09:00:00', 100),
(135, 1203, 1345605, 9938600, 9938607, '2021-01-03', '08:30:00', '09:00:00', 120),
(136, 1205, 1345605, 9938600, 9938608, '2021-01-03', '08:30:00', '09:00:00', 100);


ALTER TABLE `department_info`
  ADD PRIMARY KEY (`DeptID`);


ALTER TABLE `employee_department`
  ADD KEY `EmpID` (`EmpID`),
  ADD KEY `DeptID` (`DeptID`);

ALTER TABLE `employee_department` 
  ADD UNIQUE( `EmpID`, `DeptID`);


ALTER TABLE `employee_info`
  ADD PRIMARY KEY (`EmpID`);


ALTER TABLE `passenger_info`
  ADD PRIMARY KEY (`PassID`);


ALTER TABLE `purchased_tickets`
  ADD KEY `PassID` (`PassID`),
  ADD KEY `TrainSchedID` (`TrainSchedID`);

ALTER TABLE `purchased_tickets` 
  ADD UNIQUE( `PassID`, `TrainSchedID`);

ALTER TABLE `station_info`
  ADD PRIMARY KEY (`StationID`);


ALTER TABLE `train_info`
  ADD PRIMARY KEY (`TrainID`);


ALTER TABLE `train_schedule`
  ADD PRIMARY KEY (`TrainSchedID`),
  ADD KEY `EmpID` (`EmpID`),
  ADD KEY `CurrentStation` (`CurrentStation`),
  ADD KEY `Destination` (`Destination`),
  ADD KEY `TrainID` (`TrainID`);


ALTER TABLE `employee_department`
  ADD CONSTRAINT `employee_department_ibfk_1` FOREIGN KEY (`EmpID`) REFERENCES `employee_info` (`EmpID`)ON DELETE CASCADE,
  ADD CONSTRAINT `employee_department_ibfk_2` FOREIGN KEY (`DeptID`) REFERENCES `department_info` (`DeptID`)ON DELETE CASCADE;


ALTER TABLE `purchased_tickets`
  ADD CONSTRAINT `purchased_tickets_ibfk_1` FOREIGN KEY (`PassID`) REFERENCES `passenger_info` (`PassID`)ON DELETE CASCADE,
  ADD CONSTRAINT `purchased_tickets_ibfk_2` FOREIGN KEY (`TrainSchedID`) REFERENCES `train_schedule` (`TrainSchedID`)ON DELETE CASCADE;


ALTER TABLE `train_schedule`
  ADD CONSTRAINT `train_schedule_ibfk_1` FOREIGN KEY (`TrainID`) REFERENCES `train_info` (`TrainID`) ON DELETE CASCADE,
  ADD CONSTRAINT `train_schedule_ibfk_2` FOREIGN KEY (`EmpID`) REFERENCES `employee_info` (`EmpID`) ON DELETE CASCADE,
  ADD CONSTRAINT `train_schedule_ibfk_3` FOREIGN KEY (`CurrentStation`) REFERENCES `station_info` (`StationID`) ON DELETE CASCADE,
  ADD CONSTRAINT `train_schedule_ibfk_4` FOREIGN KEY (`Destination`) REFERENCES `station_info` (`StationID`)ON DELETE CASCADE;


CREATE TRIGGER employee_id_inc BEFORE INSERT ON employee_info
  FOR EACH ROW 
    SET NEW.EmpID = (SELECT MAX(EmpID) + 1 FROM employee_info);

CREATE TRIGGER department_id_inc BEFORE INSERT ON department_info
  FOR EACH ROW 
    SET NEW.DeptID = (SELECT MAX(DeptID) + 1 FROM department_info);

CREATE TRIGGER passenger_id_inc BEFORE INSERT ON passenger_info
  FOR EACH ROW 
    SET NEW.PassID = (SELECT MAX(PassID) + 1 FROM passenger_info);

CREATE TRIGGER station_id_inc BEFORE INSERT ON station_info
  FOR EACH ROW 
    SET NEW.StationID = (SELECT MAX(StationID) + 1 FROM station_info);

CREATE TRIGGER train_id_inc BEFORE INSERT ON train_info
  FOR EACH ROW 
    SET NEW.TrainID = (SELECT MAX(TrainID) + 1 FROM train_info);

CREATE TRIGGER sched_id_inc BEFORE INSERT ON train_schedule
  FOR EACH ROW 
    SET NEW.TrainSchedID = (SELECT MAX(TrainSchedID) + 1 FROM train_schedule);

CREATE TRIGGER JobTitle_update BEFORE INSERT ON employee_department
    FOR EACH ROW 
        SET NEW.JobTitle = 'Trainee';