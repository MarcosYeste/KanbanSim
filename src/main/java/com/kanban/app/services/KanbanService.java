package com.kanban.app.services;

import java.lang.annotation.Documented;
import java.util.List;
import java.util.UUID;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import com.kanban.app.Model.Phase;
import com.kanban.app.Model.Results;
import com.kanban.app.Model.Task;
import com.kanban.app.Model.User;

@Service
public class KanbanService {

	public List<Phase> saveFases(Phase fases,List<Phase> phasesArray ) {
		String uniqueID = UUID.randomUUID().toString();	
		fases.setId(uniqueID);
		phasesArray.add(fases);

		return phasesArray;

	}
	public List<User> saveUser(User user,List<User> userArray) {
		String uniqueID = UUID.randomUUID().toString();	
		user.setId(uniqueID);
		userArray.add(user);


		return userArray;

	}
	public List<Task> saveTask(Task task,List<Task> taskArray) {
		String uniqueID = UUID.randomUUID().toString();	
		task.setId(uniqueID);

		taskArray.add(task);


		return taskArray;

	}

	//	public Results saveResultados(JSONObject jsonobject) {
	//		
	//		Results nuevosResultados = new Results((int[]) jsonobject.get("taskCycle"),(int[]) jsonobject.get("taskLead"), (int[]) jsonobject.get("taskEsfuerzo"), (String[]) jsonobject.get("taskUsuarios"), (double[]) jsonobject.get("taskMediaCL"),
	//				(int[]) jsonobject.get("taskBacklog"),(int[][]) jsonobject.get("taskPhasesSeconds"), (int[][][]) jsonobject.get("phaseStatesSeconds"), (int[][][]) jsonobject.get("phaseSumaStates"),
	//				(double[][][]) jsonobject.get("phaseMediaFase"),(double[][][]) jsonobject.get("phaseMediaTask"),(Double) jsonobject.get("phaseMediaTotal"),(int[]) jsonobject.get("phaseSecondsTotal"), (int[]) jsonobject.get("userTaskWorked"),
	//				(int[]) jsonobject.get("userActiveTime"),(int[]) jsonobject.get("userInactiveTime"),(int[]) jsonobject.get("userBestWorker"), (int[]) jsonobject.get("userLessWorker"), (int[][]) jsonobject.get("userSecondsPhase"),
	//				(String[][]) jsonobject.get("userNamesWorstBest"));
	//		
	//		// repository.save(resultados);
	//		
	//		return nuevosResultados;
	//		
	//	} 


	// Converts a String to an array of integers
	public static int[] fromStrtoIntArray(String str) {

		String[] strArray;
		str = str.replaceAll("[\\[\\]]", ""); strArray = str.split(",");
		int[] intArray = new int[strArray.length];

		for (int i = 0; i < strArray.length; i++) {

			intArray[i] = Integer.parseInt(strArray[i]);

		}

		return intArray;

	}

	// Converts a String to an two-dimensional array of integers
	public static int[][] fromStrtoIntArray2D(String str) {

		String[] rows = str.split("],");
		int[][] intArray = new int[rows.length][];

		for (int i = 0; i < rows.length; i++) {
			rows[i] = rows[i].replaceAll("[\\[\\]]", "");
			String[] cols = rows[i].split(",");

			if(i == 0) {
				intArray = new int[rows.length][cols.length];
			}

			for (int j = 0; j < cols.length; j++) {
				intArray[i][j] = Integer.parseInt(cols[j]);
			}
		}

		return intArray;

	}

	// Converts a String to an three-dimensional array of integers
	public static int[][][] fromStrtoIntArray3D(String str) {

		String[] x = str.split("]],");
		int[][][] intArray = new int[x.length][][];

		for (int i = 0; i < x.length; i++) {
			
			String[] y = x[i].split("],");

			if(i == 0) {
				intArray = new int[x.length][y.length][];
			}

			for (int j = 0; j < y.length; j++) {
				y[j] = y[j].replaceAll("[\\[\\]]", "");
				String[] z = y[j].split(",");
				
				if(j == 0) {
					intArray = new int[x.length][y.length][z.length];
				}
				
				for (int k = 0; k < z.length; k++) {
					intArray[i][j][k] = Integer.parseInt(z[k]);
				}
			}
		}

		return intArray;

	}

	// Converts a String to an array of Doubles
	public static double[] fromStrtoDoubleArray(String str) {

		String[] strArray;
		str = str.replaceAll("[\\[\\]]", ""); strArray = str.split(",");
		double[] doubleArray = new double[strArray.length];

		for (int i = 0; i < strArray.length; i++) {

			doubleArray[i] = Double.parseDouble(strArray[i]);

		}

		return doubleArray;

	}
	
	// Converts a String to an three-dimensional array of integers
		public static double[][][] fromStrtoDoubleArray3D(String str) {

			String[] x = str.split("]],");
			double[][][] doubleArray = new double[x.length][][];

			for (int i = 0; i < x.length; i++) {
				
				String[] y = x[i].split("],");

				if(i == 0) {
					doubleArray = new double[x.length][y.length][];
				}

				for (int j = 0; j < y.length; j++) {
					y[j] = y[j].replaceAll("[\\[\\]]", "");
					String[] z = y[j].split(",");
					
					if(j == 0) {
						doubleArray = new double[x.length][y.length][z.length];
					}
					
					for (int k = 0; k < z.length; k++) {
						doubleArray[i][j][k] = Double.parseDouble(z[k]);
					}
				}
			}

			return doubleArray;

		}

	// Converts a String to an array of Strings
	public static String[] fromStrtoStrArray(String str) {

		String[] strArray;
		str = str.replaceAll("[\\[\\]]", ""); strArray = str.split(",");

		return strArray;

	}

	// Converts a String to an two-dimensional array of Strings
	public static String[][] fromStrtoStrArray2D(String str) {

		String[] rows = str.split("],");
		String[][] strArray = new String[rows.length][];

		for (int i = 0; i < rows.length; i++) {
			rows[i] = rows[i].replaceAll("[\\[\\]]", "");
			String[] cols = rows[i].split(",");

			if(i == 0) {
				strArray = new String[rows.length][cols.length];
			}

			for (int j = 0; j < cols.length; j++) {
				strArray[i][j] = cols[j];
			}
		}

		return strArray;

	}
}