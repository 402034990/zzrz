package com.nc.util;


import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.Vector;

import javax.wsdl.Binding;
import javax.wsdl.Operation;
import javax.wsdl.Port;
import javax.xml.namespace.QName;
import javax.xml.rpc.encoding.DeserializerFactory;

import org.apache.axis.client.Call;
import org.apache.axis.client.Service;
import org.apache.axis.encoding.ser.SimpleDeserializer;
import org.apache.axis.wsdl.gen.Parser;
import org.apache.axis.wsdl.symbolTable.BaseType;
import org.apache.axis.wsdl.symbolTable.BindingEntry;
import org.apache.axis.wsdl.symbolTable.Parameter;
import org.apache.axis.wsdl.symbolTable.Parameters;
import org.apache.axis.wsdl.symbolTable.ServiceEntry;
import org.apache.axis.wsdl.symbolTable.SymTabEntry;
import org.apache.axis.wsdl.symbolTable.SymbolTable;
import org.apache.axis.wsdl.toJava.Utils;
public class InterSynConn {
    
	//此抛送地址已经转正式，不能在本地进行抛送
//	private String url = "http://192.168.46.44:8888/uapws/service/nc.syn.itf.ISynDataService?wsdl";// 提供接口的地址
	private String url = "";// 提供接口的地址
	private Parser wsdlParser;
	private Map services;
	private String serviceName;
	private String portName;
	
	public InterSynConn() throws Exception {
		wsdlParser = null;
		services = null;
		serviceName = null;
		portName = null;
		wsdlParser = new Parser();
		wsdlParser.run(url);
		serviceName = "ISynDataService";//服务名
		portName = "ISynDataServiceSOAP11port_http";//端口名
		services = enumSymTabEntry(org.apache.axis.wsdl.symbolTable.ServiceEntry.class);
	}
	
	public String invoke(String operationName, String parameterValues)throws Exception {
		Vector inputs = new Vector();
		ServiceEntry serviceEntry = (ServiceEntry) services.get(serviceName);
		javax.wsdl.Service service = serviceEntry.getService();
		Service clientService = new Service(wsdlParser, service.getQName());
		javax.xml.rpc.Call call = clientService.createCall(QName.valueOf(portName), QName.valueOf(operationName));
		((Call) call).setTimeout(new Integer(15000));
		BindingEntry bindingEntry = getBindingEntry(serviceName, portName);
		Operation o = getOperation(bindingEntry, operationName);
		Parameters parameters = bindingEntry.getParameters(o);
		int size = parameters.list.size();
		for (int i = 0; i < size; i++) {
			Parameter p = (Parameter) parameters.list.get(i);
			switch (p.getMode()) {
				case 1:
					inputs.add(getParamData((Call) call, p,parameterValues));
					break;
				case 3:
					inputs.add(getParamData((Call) call, p,parameterValues));
					break;
			}
		}
		try{
			Object ret = call.invoke(inputs.toArray());
			return (String) ret;
			//return "8888";
		}catch(Exception e){
			throw new Exception(e.getMessage());
		}
	}
	
	public Vector enumServiceNames() {
		Vector v = new Vector();
		String s;
		for (Iterator i = services.keySet().iterator(); i.hasNext(); v.addElement(s))
		s = (String) i.next();
		return v;
	}
	
	public Vector enumPortNames(String serviceName) {
		Vector v = new Vector();
		ServiceEntry serviceEntry = (ServiceEntry) services.get(serviceName);
		Map ports = serviceEntry.getService().getPorts();
		String s;
		for (Iterator i = ports.keySet().iterator(); i.hasNext(); v.addElement(s))
		s = (String) i.next();
		return v;
	}
	
	public Vector enumOperationNames(String serviceName, String portName) {
		Vector v = new Vector();
		BindingEntry entry = getBindingEntry(serviceName, portName);
		Set operations = entry.getOperations();
		String s;
		for (Iterator i = operations.iterator(); i.hasNext(); v.addElement(s)) {
			Operation o = (Operation) i.next();
			s = o.getName();
		}
		return v;
	}
	
	public Parameters enumParameters(String serviceName, String portName,
			String operationName) {
		BindingEntry entry = getBindingEntry(serviceName, portName);
		Operation o = getOperation(entry, operationName);
		Parameters parameters = entry.getParameters(o);
		return parameters;
	}
	
	public String getParameterModeString(Parameter p) {
		String ret = null;
		switch (p.getMode()) {
		case 1:
			ret = "[IN]";
			break;
		case 3:
			ret = "[IN, OUT]";
			break;
		case 2:
			ret = "[OUT]";
			break;
		}
		return ret;
	}
	
	private BindingEntry getBindingEntry(String serviceName, String portName) {
		ServiceEntry serviceEntry = (ServiceEntry) services.get(serviceName);
		Port port = serviceEntry.getService().getPort(portName);
		Binding binding = port.getBinding();
		SymbolTable table = wsdlParser.getSymbolTable();
		return table.getBindingEntry(binding.getQName());
	}
	
	private Operation getOperation(BindingEntry entry, String operationName) {
		Set operations = entry.getOperations();
		for (Iterator i = operations.iterator(); i.hasNext();) {
			Operation o = (Operation) i.next();
			if (operationName.equals(o.getName()))
				return o;
		}

		return null;
	}
	
	private Map enumSymTabEntry(Class cls) {
		HashMap ret = new HashMap();
		HashMap map = wsdlParser.getSymbolTable().getHashMap();
		for (Iterator iterator = map.entrySet().iterator(); iterator.hasNext();) {
			java.util.Map.Entry entry = (java.util.Map.Entry) iterator.next();
			QName key = (QName) entry.getKey();
			Vector v = (Vector) entry.getValue();
			int size = v.size();
			for (int i = 0; i < size; i++) {
				SymTabEntry symTabEntry = (SymTabEntry) v.elementAt(i);
				if (cls.isInstance(symTabEntry))
					ret.put(key.getLocalPart(), symTabEntry);
			}

		}

		return ret;
	}
	
	private Object getParamData(Call c, Parameter p, String arg)throws Exception {
		QName paramType = Utils.getXSIType(p);
		org.apache.axis.wsdl.symbolTable.TypeEntry type = p.getType();
		if ((type instanceof BaseType) && ((BaseType) type).isBaseType()) {
			DeserializerFactory factory = c.getTypeMapping().getDeserializer(paramType);
			javax.xml.rpc.encoding.Deserializer deserializer = factory.getDeserializerAs("Axis SAX Mechanism");
			if (deserializer instanceof SimpleDeserializer)
				return ((SimpleDeserializer) deserializer).makeValue(arg);
		}
		throw new RuntimeException("not know how to convert '" + arg+ "' into " + c);
	}
}