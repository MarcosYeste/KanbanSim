package com.kanban.app.services;

import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class DistributionService {

	
	public String getNextGaussian(int mean ,int variation) {
		
		Random r = new Random();
		double val = r.nextGaussian() * variation + mean;
		if(val <= 0) {
			val = 1;
		}
		return String.valueOf(val);
	}
	
	
	public String getNextPoisson(int lambda) {
		
		double L = Math.exp(-lambda);
		double p = 1.0;
		int k = 0;
		do {
			k++;
			p *= Math.random();
		} while (p > L);
		return String.valueOf(k - 1);
		
		
	}
	
	
	public String getNextWeight (int sValue, int mValue, int lValue, int xlValue) {
		Random r = new Random();
		int num = r.nextInt(100) + 1;
		String val = "";
		System.out.println(sValue + ", " + mValue + ", " + lValue + ", " + xlValue);
		if(num <= sValue) {
			val = "S";
		} else if(num > sValue && num <= sValue + mValue) {
			val = "M";
		} else if (num > sValue + mValue && num <= sValue + mValue + lValue) {
			val = "L";
		} else if (num > sValue + mValue + lValue && num <= sValue + mValue + lValue + xlValue) {
			val = "XL";
		}

		Random ran = new Random();
		int number = r.nextInt(5) + 1;

		return val + "," + String.valueOf(number);
		
		
		
	}
}
