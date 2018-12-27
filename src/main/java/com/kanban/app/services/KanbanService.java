package com.kanban.app.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.kanban.app.Model.Phase;
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


	// Converts a String to an array of integers
	public static int[] fromStrtoIntArray(String str) {

		String[] strArray;
		str = str.replaceAll("[\\[\\]]", ""); strArray = str.split(",");
		int[] intArray = new int[strArray.length];

		for (int i = 0; i < strArray.length; i++) {
			try {
				intArray[i] = Integer.parseInt(strArray[i]);
			} catch (NumberFormatException e) {
				intArray[i] = 0;
			}


		}

		return intArray;

	}

	// Converts a String to a two-dimensional array of integers
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
				try {
					intArray[i][j] = Integer.parseInt(cols[j]);
				} catch (NumberFormatException e) {
					intArray[i][j] = 0;
				}

			}
		}

		return intArray;

	}

	// Converts a String to a three-dimensional array of integers
	public static int[][][] fromStrtoIntArray3D(String str) {
		str = str.replaceAll("\\[\\]", "[[]]");
		String[] x = str.split("]],");
		int[][][] intArray = new int[x.length][][];

		for (int i = 0; i < x.length; i++) {
			//System.out.println("x[i] " + x[i]);
			String[] y = x[i].split("],");

			if(i == 0) {
				intArray = new int[x.length][y.length][];
			}

			//System.out.println("Bucle Inicial I");

			for (int j = 0; j < y.length; j++) {

				y[j] = y[j].replaceAll("[\\[\\]]", "");
				//System.out.println("Y[j] " + y[j]);
				String[] z = y[j].split(",");

				if(i == 0 && j == 0) {
					//System.out.println("Hola");
					intArray = new int[x.length][y.length][z.length];
				}

				//System.out.println("x=" + x.length + " Y=" + y.length + "  z=" + z.length);
				for (int k = 0; k < z.length; k++) {
					
					try {
						
						//System.out.println("try");
						intArray[i][j][k] = Integer.parseInt(z[k]);
						//System.out.println(Integer.parseInt(z[k]));
						//System.out.println(z[k]);
						
					} catch (Exception e) {
						
						try {
							//System.out.println("i=" + i + " j=" + j);
							//System.out.println("Catch");
							intArray[i][j][0] = 0;
//							//System.out.println("exception " + intArray[i][j][0]);
							
						}catch (Exception n) {
//							//System.out.println("PEta");
						}
					}

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
			try {
				doubleArray[i] = Double.parseDouble(strArray[i]);
			} catch (Exception e) {
				doubleArray[i] = 0;
			}
		}

		return doubleArray;

	}

	// Converts a String to a three-dimensional array of integers
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

					try {
						doubleArray[i][j][k] = Double.parseDouble(z[k]);
					} catch (NumberFormatException e) {
						doubleArray[i][j][k] = 0;
					}

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

	// Converts a String to a two-dimensional array of Strings
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